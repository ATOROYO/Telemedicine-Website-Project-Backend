// const session = require('express-session');

// //Code for my middlewares
// exports.ensureAuthenticated = (req, res, next) => {
//   if (req.session.patient) {
//     return next();
//   } else {
//     res.status(401).json({ message: 'Please log in to access this resource' });
//   }
// };

// // middleware/auth.js

// // function ensureAdmin(req, res, next) {
// //   if (req.session && req.session.user && req.session.user.role === 'admin') {
// //     // User is an admin, continue to the next middleware or route handler
// //     return next();
// //   } else {
// //     // User is not an admin, send an error response
// //     res.status(403).json({ message: 'Access denied. Admins only.' });
// //   }
// // }

// // After a successful login
// req.session.user = {
//   id: user.id,
//   email: user.email,
//   role: user.role, // This should be 'admin' or 'patient'
// };

// module.exports = { ensureAdmin };

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Login route handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Set session after successful login
    req.session.user = {
      id: user._id, // MongoDB ID or user ID
      email: user.email, // User email
      role: user.role, // 'admin' or 'patient'
    };

    // Send success response
    res.json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
