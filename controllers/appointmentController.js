// Importing modules
const db = require('../config/db');

// Getting all apointments from the database
exports.getAllAppointments = (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Booking appointments
exports.bookAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;
  db.query(
    'INSERT INTO appointments SET ?',
    { patient_id, doctor_id, appointment_date, status: 'pending' },
    (err, result) => {
      if (err) throw err;
      res.send('Appointment booked');
    }
  );
};
