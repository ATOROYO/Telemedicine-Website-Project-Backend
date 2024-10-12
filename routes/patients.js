// Importing modules
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Patient Routes
router.get('/', patientController.getAllPatients);
router.post('/add', patientController.addPatient);
router.get('/:id', patientController.getPatientById);

module.exports = router;
