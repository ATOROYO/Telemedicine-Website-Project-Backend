// Importing modules
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor Routes
router.get('/', doctorController.getAllDoctors);
router.post('/add', doctorController.addDoctor);
router.get('/:id', doctorController.getDoctorById);

// Get list of doctors
router.get('/', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
