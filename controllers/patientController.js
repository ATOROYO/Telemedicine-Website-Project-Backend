// Importing modules
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Patient Registration
exports.registerPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Add validation logic if necessary

    // Assuming you have a function to save the patient to the database
    await savePatientToDatabase(firstName, lastName, email, password, phone);

    // Send a proper JSON response
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    // Send error response
    res
      .status(500)
      .json({ message: 'Registration failed', error: error.message });
  }
};

// Patient Login
exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the patient exists
    const patient = await db.query('SELECT * FROM patients WHERE email = ?', [
      email,
    ]);
    if (patient.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, patient[0].password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Successful login: set session and return success
    req.session.user = {
      id: patient[0].id,
      email: patient[0].email,
      role: 'patient',
    };

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later',
    });
  }
};

// View patient profile
exports.viewProfile = (req, res) => {
  const patientId = req.session.patient.id;

  db.query(
    'SELECT first_name, last_name, email FROM users WHERE user_id = ?',
    [patientId],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    }
  );
};

// Update patient profile
exports.updateProfile = (req, res) => {
  const patientId = req.session.patient.id;
  const { first_name, last_name } = req.body;

  db.query(
    'UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?',
    [first_name, last_name, patientId],
    (err, result) => {
      if (err) throw err;

      if (result.affectedRows > 0) {
        res.json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    }
  );
};

// Logout patient
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({ message: 'Logged out successfully' });
  });
};

// Getting all the patients
exports.getAllPatients = async (req, res) => {
  try {
    // Use async/await with promise-based MySQL2
    const [patients] = await db.execute('SELECT * FROM patients');

    res.json({ success: true, patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error fetching patients' });
  }
};

// Save patients into the database
const savePatientToDatabase = async (
  firstName,
  lastName,
  email,
  password,
  phone
) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  const query =
    'INSERT INTO patients (first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?)';
  const values = [firstName, lastName, email, hashedPassword, phone];

  await db.execute(query, values);
};

// Adding new patient to the database
exports.addPatient = (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  db.query(
    'INSERT INTO users SET ?',
    { first_name, last_name, email, password, role: 'patient' },
    (err, result) => {
      if (err) throw err;
      res.send('Patient added');
    }
  );
};

// Geeting existing user fromthe database
exports.getPatientById = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM users WHERE user_id = ? AND role = "patient"',
    [id],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};
