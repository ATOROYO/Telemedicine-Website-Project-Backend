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

// Update doctor profile/schedule
router.put('/doctors/:id', ensureAdmin, (req, res) => {
  const doctorId = req.params.id;
  const { first_name, last_name, specialization, schedule } = req.body;

  db.query(
    'UPDATE doctors SET first_name = ?, last_name = ?, specialization = ?, schedule = ? WHERE id = ?',
    [first_name, last_name, specialization, schedule, doctorId],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Doctor profile updated successfully' });
    }
  );
});

// Deactivate doctor profile
router.delete('/doctors/:id', ensureAdmin, (req, res) => {
  const doctorId = req.params.id;

  db.query('DELETE FROM doctors WHERE id = ?', [doctorId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Doctor profile deleted successfully' });
  });
});

// Admin Routes
router.get('/', adminController.getAdminDashboard);
router.post('/addDoctor', adminController.addDoctor);

module.exports = router;
