// Importing modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');

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
