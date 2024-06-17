<template>
    <div class="login_frame">
        <div class="title_login">
            <h1>SciGate</h1><span>v1.0.0</span>
        </div>
        <div class="login-container">
            <form @submit.prevent="login">
                <label for="server">Select Server:</label>
                <select id="server" v-model="selectedServer">
                <option value="" disabled>Select a server</option>
                <option v-for="server in servers" :key="server.id" :value="server.id">{{ server.serverName }}</option>
                </select>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" :disabled="!selectedServer" required>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" :disabled="!selectedServer" required>
                <br>
                <button type="submit" :disabled="!selectedServer">Login</button>
            </form>
        </div>
        <br>
        <p>
            Click here to <a href="" @click.prevent="addServer">add your server</a> before be able to login
        </p>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            username: '',
            password: '',
            selectedServer: null,
            servers: []
        };
    },
    created() {
        this.fetchServers();
    },
    methods: {
        async addServer() {
            const { value: formValues, isConfirmed } = await Swal.fire({
                title: 'Setup Server',
                html: `
                <div class="g-pop">
                    <input id="swal-input1" class="swal2-input" placeholder="Server Name">
                    <input id="swal-input2" class="swal2-input" placeholder="Hostname">
                    <input id="swal-input3" class="swal2-input" type="number" placeholder="Port">
                    <label for="swal-input4" style="display: flex; align-items: center; justify-content: space-between;">
                    <span>Requires VPN</span>
                    <input id="swal-input4" type="checkbox">
                    </label>
                    <input id="swal-input5" class="swal2-input" placeholder="VPN Link" style="display: none;">
                </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Validate',
                preConfirm: () => {
                    const serverName = document.getElementById('swal-input1').value;
                    const hostname = document.getElementById('swal-input2').value;
                    const port = document.getElementById('swal-input3').value;
                    const requiresVpn = document.getElementById('swal-input4').checked;
                    const vpnLink = document.getElementById('swal-input5').value;
                    return { serverName, hostname, port, requiresVpn, vpnLink };
                },
                didOpen: () => {
                    const requiresVpnCheckbox = document.getElementById('swal-input4');
                    const vpnLinkInput = document.getElementById('swal-input5');
                    requiresVpnCheckbox.addEventListener('change', () => {
                        if (requiresVpnCheckbox.checked) {
                        vpnLinkInput.style.display = 'block';
                        } else {
                        vpnLinkInput.style.display = 'none';
                        }
                    });
                }
            });

            if (isConfirmed && formValues.hostname != "" && formValues.port != "" && formValues.serverName != "") {
                console.log(formValues)
                try {
                    const response = await window.electron.addServer(formValues);
                    if (response.success) { 
                        Swal.fire('Success', 'Server added successfully!', 'success');
                        this.fetchServers();
                    } else {
                        throw new Error(response.error);
                    }
                } 
                catch (error) {
                    Swal.fire('Error', 'Failed to add server.', 'error');
                    console.error(error);
                }
            }
            else{
                Swal.fire('Error', 'Please fill all required field', 'error');
            }
        },
        async fetchServers() {
            const response = await window.electron.fetchServer();
            if (response.success) {
                this.servers = response.serverId;
            } 
            else {
                Swal.fire('Error', response.error, 'error');
            }
        },
        async login() {
            if (!this.selectedServer) {
                Swal.fire('Error', 'Please select a server to login', 'error');
                return;
            }
            if (!this.username || !this.password) {
                Swal.fire('Error', 'Please fill in all fields.');
                return;
            }
            // Check if the selected server requires VPN
            const selectedServer = this.servers.find(server => server.id === this.selectedServer);
            if (selectedServer && selectedServer.requiresVpn && selectedServer.vpnLink) {
                Swal.fire({
                    title: 'Connecting via VPN',
                    text: 'This server require VPN connexion. Redirecting to VPN link...',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Proceed',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(selectedServer.vpnLink, '_blank');
                    } else {
                        Swal.fire('Cancelled', 'VPN connection cancelled', 'info');
                    }
                });
            } 

            // SSH connection configuration
            const sshConfig = {
                host: selectedServer.hostname,
                port: selectedServer.port,
                username: this.username,
                password: this.password
            };
            try {
                const response = await window.electron.initSSHManager();
                if (!response.success) {
                    Swal.fire('Error', response.error, 'error');
                }

                const sshManager = response.sshManager;
                await sshManager.connect(sshConfig);
                console.log('Connected to SSH server');

                // Execute command
                const command = 'ls -l';
                const result = await sshManager.executeCommand(command);
                console.log('Command output:', result);

                // Disconnect from SSH server
                sshManager.disconnect();
                console.log('Disconnected from SSH server');

                // Route to dashboard or perform other actions upon successful login
                //this.routeToDashboardWithSSH(sshManager);
                console.log(`User: ${this.username}, Password: ${this.password}`);
                alert('Login successful!');
            } 
            catch (error) {
                console.error('Error:', error);
                Swal.fire('Error', 'Failed to connect via SSH. Please check your credentials and try again.', 'error');
            }
        },
    }
};
</script> 

<style scoped>
    .g-pop{
        display: flex;
        flex-direction: column;
    }
    .g-pop input{
        margin: 0;
    }
    .title_login{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .title_login span{
        position: relative;
        top: .75em;
        left: 0.1em;
    }
    label{
        text-align: left;
    }
    input{
        max-width: 25em;
    }
    .login-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 5px;
    }
    input, select, button {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    button {
        background-color: #646cff;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #4c54f5;
    }
</style>