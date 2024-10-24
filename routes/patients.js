// Importing modules
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/db'); // Import the promise-based MySQL pool
const patientController = require('../controllers/patientController');
const {
  ensureAuthenticated,
  ensureAdmin,
  ensurePatient,
} = require('../middlewares/auth');

// View profile
router.get('/profile', ensureAuthenticated, patientController.viewProfile);

// Update profile
router.put('/profile', ensureAuthenticated, patientController.updateProfile);

// Patient Routes
router.get('/', patientController.getAllPatients);
router.post('/add', patientController.addPatient);
router.get('/:id', patientController.getPatientById);

// Registration Route
router.post('/register', patientController);

// Login route
router.post('/login', patientController.loginPatient);

// Logout route
router.post('/logout', ensureAuthenticated, patientController.logout);

module.exports = router;
