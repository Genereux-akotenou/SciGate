const db = require('./database.cjs');

class AppStorage {
  static addServer({ serverName, hostname, port, requiresVpn, vpnLink }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO servers (serverName, hostname, port, requiresVpn, vpnLink)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.run(query, [serverName, hostname, port, requiresVpn ? 1 : 0, vpnLink], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
  static getAllServers() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM servers`;
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = AppStorage;
