// Importing modules
const mysql = require('mysql2/promise'); // Use the promise-based client
require('dotenv').config();

// Setting up database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Database connected!');
    conn.release();
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
})();

// console.log(pool);

module.exports = pool;
