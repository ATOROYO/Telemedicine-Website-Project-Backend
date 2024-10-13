// Importing modules
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Book an appointment
router.post('/', ensureAuthenticated, (req, res) => {
  const { doctorId, appointmentDate, time } = req.body;
  const patientId = req.session.patient.id;

  db.query(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, time) VALUES (?, ?, ?, ?)',
    [patientId, doctorId, appointmentDate, time],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Appointment booked successfully' });
    }
  );
});

// Get appointments for logged-in patient
router.get('/my-appointments', ensureAuthenticated, (req, res) => {
  const patientId = req.session.patient.id;

  db.query(
    'SELECT * FROM appointments WHERE patient_id = ?',
    [patientId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get appointments for a specific doctor
router.get('/doctor/:id', ensureAuthenticated, (req, res) => {
  const doctorId = req.params.id;

  db.query(
    'SELECT * FROM appointments WHERE doctor_id = ?',
    [doctorId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Reschedule an appointment
router.put('/:id', ensureAuthenticated, (req, res) => {
  const appointmentId = req.params.id;
  const { appointmentDate, time } = req.body;

  db.query(
    'UPDATE appointments SET appointment_date = ?, time = ? WHERE id = ?',
    [appointmentDate, time, appointmentId],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Appointment rescheduled successfully' });
    }
  );
});

// Cancel an appointment
router.delete('/:id', ensureAuthenticated, (req, res) => {
  const appointmentId = req.params.id;

  db.query(
    'UPDATE appointments SET status = "canceled" WHERE id = ?',
    [appointmentId],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Appointment canceled successfully' });
    }
  );
});

// Appointment Routes (Protected)
router.get('/', ensureAuthenticated, appointmentController.getAllAppointments);
router.post(
  '/book',
  ensureAuthenticated,
  appointmentController.bookAppointment
);
router.get(
  '/:id',
  ensureAuthenticated,
  appointmentController.getAppointmentById
);

module.exports = router;
