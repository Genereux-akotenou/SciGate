const { Client } = require('ssh2');

class SSHManager {
  constructor() {
    this.sshClient = new Client();
  }

  connect(config) {
    return new Promise((resolve, reject) => {
      this.sshClient.on('ready', () => {
        console.log('SSH connection established');
        resolve();
      });

      this.sshClient.on('error', (err) => {
        console.error('SSH connection error:', err);
        reject(err);
      });

      this.sshClient.connect(config);
    });
  }

  disconnect() {
    this.sshClient.end();
    console.log('SSH connection closed');
  }

  async executeCommand(command) {
    return new Promise((resolve, reject) => {
      this.sshClient.exec(command, (err, stream) => {
        if (err) {
          reject(err);
          return;
        }

        let output = '';
        stream
          .on('close', (code, signal) => {
            console.log(`Command execution closed with code ${code}, signal ${signal}`);
            resolve(output);
          })
          .on('data', (data) => {
            output += data.toString();
          })
          .stderr.on('data', (data) => {
            console.error(`Command execution error: ${data}`);
            reject(data.toString());
          });
      });
    });
  }
}

module.exports = SSHManager;
