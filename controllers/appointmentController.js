// Importing modules
const db = require('../config/db');

// Getting all apointments from the database
exports.getAllAppointments = (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
