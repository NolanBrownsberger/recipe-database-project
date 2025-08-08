const db = require('./db');

async function findUserByUsername(username) {
  const [rows] = await db.query('SELECT * FROM USER WHERE username = ?', [username]);
  return rows[0];
}

async function createUser(username, password, isAdmin = false) {
  const [result] = await db.query(
    'INSERT INTO USER (username, password, is_admin) VALUES (?, ?, ?)',
    [username, password, isAdmin]
  );
  return result.insertId;
}

module.exports = {
  findUserByUsername,
  createUser
};