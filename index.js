// // Importing modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const db = require('./config/db');
// const session = require('express-session');
// const cors = require('cors');

// const {
//   ensureAuthenticated,
//   ensureAdmin,
//   ensurePatient,
// } = require('./middlewares/auth');

// // Routes
// const patientRoutes = require('./routes/patients');
// const doctorRoutes = require('./routes/doctors');
// const appointmentRoutes = require('./routes/appointments');
// const adminRoutes = require('./routes/admin');

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors()); // Add CORS for cross-origin requests
// app.use(express.json()); // Parse JSON body

// // This ensures that incoming requests with JSON bodies are parsed
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Session setup
// app.use(
//   session({
//     secret: 'telemedicine_secret', // Replace with a strong secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 * 30 }, // Session expires after 30 minutes
//   })
// );

// // Routes
// app.use('/patients', patientRoutes);
// app.use('/doctors', doctorRoutes);
// app.use('/appointments', appointmentRoutes);
// app.use('/admin', adminRoutes);

// app.get('/patients', ensurePatient, (req, res) => {
//   // res.send('Patient Dashboard');
//   res.sendFile();
// });

// // Start the Server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// app.js
const express = require('express');
const session = require('express-session');
const MySQLStore = require('connect-mysql2')(session);
const path = require('path');
require('dotenv').config();

// Import patient routes
const patientRoutes = require('./routes/patients');

// Initialize the server
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Setup session
app.use(
  session({
    key: 'patient_id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.get('/', (req, res) => {
  res.sendFile();
});
app.use('/patients', patientRoutes); // Use patient routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
