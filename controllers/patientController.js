// Importing modules
const db = require('../config/db');

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
