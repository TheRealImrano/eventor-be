// save this as test-db.js
const db = require('./config/db'); // Adjust path as necessary

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
    process.exit(1);
  } else {
    console.log('The current date and time on the DB is:', res.rows[0]);
    process.exit(0);
  }
});
