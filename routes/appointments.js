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
