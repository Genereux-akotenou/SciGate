const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected.');
    db.run(`
      CREATE TABLE IF NOT EXISTS servers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverName TEXT,
        hostname TEXT,
        port INTEGER,
        requiresVpn INTEGER,
        vpnLink TEXT
      )
    `);
  }
});

module.exports = db;
