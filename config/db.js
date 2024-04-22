const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Get the database connection URL from environment variables
  ssl: {
    rejectUnauthorized: false // Necessary if your environment requires SSL (like Heroku)
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
