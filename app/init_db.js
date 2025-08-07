const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server.');

  const schema = fs.readFileSync('./mysql/schema.sql', 'utf8');
  const seed = fs.readFileSync('./mysql/seed.sql', 'utf8');

  connection.query(schema, (err) => {
    if (err) throw err;
    console.log('Schema created.');

    connection.query(seed, (err) => {
      if (err) throw err;
      console.log('Data seeded.');
      connection.end();
    });
  });
})