// Importing modules
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register a new patient
exports.registerPatient = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Check if the email is already registered
  db.query(
    'SELECT * FROM users WHERE email = ? AND role = "patient"',
    [email],
    async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email is already registered' });
      } else {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
          'INSERT INTO users SET ?',
          {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: 'patient',
          },
          (err, result) => {
            if (err) throw err;
            res
              .status(201)
              .json({ message: 'Patient registered successfully' });
          }
        );
      }
    }
  );
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
