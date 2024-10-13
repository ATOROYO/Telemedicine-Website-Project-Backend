// Importing modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const session = require('express-session');

// Routes
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: 'telemedicine_secret', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 30 }, // Session expires after 30 minutes
  })
);

// Routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Rhema Hospital Telemedicine Service');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
