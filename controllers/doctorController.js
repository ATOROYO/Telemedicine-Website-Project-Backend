// Importing modules
const db = require('../config/db');

// Getting all doctors fromthe database
exports.getAllDoctors = (req, res) => {
  db.query('SELECT * FROM users WHERE role = "doctor"', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Adding a doctor to the database
exports.addDoctor = (req, res) => {
  const { first_name, last_name, email, password, specialty } = req.body;
  db.query(
    'INSERT INTO users SET ?',
    { first_name, last_name, email, password, role: 'doctor', specialty },
    (err, result) => {
      if (err) throw err;
      res.send('Doctor added');
    }
  );
};
