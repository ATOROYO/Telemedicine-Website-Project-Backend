// Importing modules
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add new doctor
router.post('/doctors', ensureAdmin, (req, res) => {
  const { first_name, last_name, email, specialization, schedule } = req.body;

  db.query(
    'INSERT INTO doctors (first_name, last_name, email, specialization, schedule) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, specialization, schedule],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Doctor added successfully' });
    }
  );
});

// Admin Routes
router.get('/', adminController.getAdminDashboard);
router.post('/addDoctor', adminController.addDoctor);

module.exports = router;
