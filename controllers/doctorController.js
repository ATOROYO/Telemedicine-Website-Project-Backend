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

// Geeting doctor from the database
exports.getDoctorById = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM users WHERE user_id = ? AND role = "doctor"',
    [id],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};
