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

const {
  ensureAuthenticated,
  ensureAdmin,
  ensurePatient,
} = require('./middlewares/auth');

// Example: Admin route
app.get('/admin-dashboard', ensureAdmin, (req, res) => {
  res.send('Welcome to the Admin Dashboard!');
});

// Example: Patient route
app.get('/patient-dashboard', ensurePatient, (req, res) => {
  res.send('Welcome to the Patient Dashboard!');
});

// Example: General protected route
app.get('/protected', ensureAuthenticated, (req, res) => {
  res.send('You are authenticated and can access this protected route.');
});
