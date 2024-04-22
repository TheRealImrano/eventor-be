const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Get the database connection URL from environment variables
  ssl: {
    rejectUnauthorized: false // Necessary if your environment requires SSL (like Heroku)
  }
});

pool.connect(err => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('connected to database');
    }
  });

  process.on('SIGINT', () => {
    pool.end().then(() => {
      console.log('Pool has ended');
      process.exit(0);
    });
  });  

module.exports = {
  query: (text, params) => pool.query(text, params),
};