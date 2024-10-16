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
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check the incoming data
    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const [existingUser] = await db.execute(
      'SELECT * FROM patients WHERE email = ?',
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO patients (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    console.log('Insert result: ', result); // Log the result of the insert query
    return res
      .status(201)
      .json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login route
router.post('/login', patientController.loginPatient);

// Logout route
router.post('/logout', ensureAuthenticated, patientController.logout);

module.exports = router;
