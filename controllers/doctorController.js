// Importing modules
const db = require('../config/db');

// Getting all doctors fromthe database
exports.getAllDoctors = (req, res) => {
  db.query('SELECT * FROM users WHERE role = "doctor"', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
