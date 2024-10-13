// Importing modules
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { ensureAuthenticated } = require('../middlewares/auth');

// View profile
router.get('/profile', ensureAuthenticated, patientController.viewProfile);

// Patient Routes
router.get('/', patientController.getAllPatients);
router.post('/add', patientController.addPatient);
router.get('/:id', patientController.getPatientById);

// Register route
router.post('/register', patientController.registerPatient);

// Login route
router.post('/login', patientController.loginPatient);

module.exports = router;
