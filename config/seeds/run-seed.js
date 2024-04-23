const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Adjust according to your SSL needs
  }
});

const seed = async () => {
  try {
    // Load SQL from seed file
    const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

    // Get a client from the pool
    const client = await pool.connect();

    // Start transaction
    await client.query('BEGIN');

    try {
      // Run the seed SQL
      await client.query(sql);

      // Commit the transaction
      await client.query('END');
      console.log('Seeding completed successfully');
    } catch (err) {
      // Rollback if errors
      await client.query('ROLLBACK');
      throw err;
    } finally {
      // Release client back to the pool
      client.release();
    }
  } catch (err) {
    console.error('Failed to seed database:', err.stack);
  } finally {
    // Close the pool to terminate the node.js script
    await pool.end();
  }
};

seed();
