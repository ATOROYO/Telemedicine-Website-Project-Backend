// Importing modules
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Patient Registration
exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingPatient = await db.query(
      'SELECT * FROM patients WHERE email = ?',
      [email]
    );
    if (existingPatient.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the patient to the database
    await db.query(
      'INSERT INTO patients (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Send success response
    res
      .status(200)
      .json({ success: true, message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Server error. Please try again later',
      });
  }
};

// Login patient
exports.loginPatient = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND role = "patient"',
    [email],
    async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const patient = results[0];

      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, patient.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Store user session
      req.session.patient = {
        id: patient.user_id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
      };

      res.json({ message: 'Login successful', patient: req.session.patient });
    }
  );
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
exports.getAllPatients = (req, res) => {
  db.query('SELECT * FROM users WHERE role = "patient"', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
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
