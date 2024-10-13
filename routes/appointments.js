// Importing modules
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { ensureAuthenticated } = require('../middlewares/auth');

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
