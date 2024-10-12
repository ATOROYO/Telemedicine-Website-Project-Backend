// Importing modules
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Appointment Routes
router.get('/', appointmentController.getAllAppointments);
router.post('/book', appointmentController.bookAppointment);
router.get('/:id', appointmentController.getAppointmentById);

module.exports = router;
