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

///////////////////////////
// Ensure the user is authenticated
// function ensureAuthenticated(req, res, next) {
//   if (req.session && req.session.user) {
//     return next();
//   }
//   return res.status(401).json({ message: 'Unauthorized' });
// }

// // Ensure the user is an admin
// function ensureAdmin(req, res, next) {
//   if (req.session.user && req.session.user.role === 'admin') {
//     return next();
//   }
//   return res.status(403).json({ message: 'Forbidden: Admins only' });
// }

// // Ensure the user is a patient
// function ensurePatient(req, res, next) {
//   if (req.session.user && req.session.user.role === 'patient') {
//     return next();
//   }
//   return res.status(403).json({ message: 'Forbidden: Patients only' });
// }

// module.exports = { ensureAuthenticated, ensureAdmin, ensurePatient };
