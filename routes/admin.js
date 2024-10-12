// Importing modules
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin Routes
router.get('/', adminController.getAdminDashboard);
router.post('/addDoctor', adminController.addDoctor);

module.exports = router;
