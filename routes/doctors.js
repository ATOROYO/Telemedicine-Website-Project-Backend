// Importing modules
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor Routes
router.get('/', doctorController.getAllDoctors);
router.post('/add', doctorController.addDoctor);
router.get('/:id', doctorController.getDoctorById);

module.exports = router;
