<template>
    <div class="login_frame">
        <div class="title_login">
            <h1>SciGate</h1><span>v1.0.0</span>
        </div>
        <div class="login-container">
        <form @submit.prevent="login">
            <label for="server">Select Server:</label>
            <select id="server" v-model="selectedServer">
            <option v-for="server in servers" :key="server.id" :value="server.id">{{ server.name }}</option>
            </select>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
        <!-- <button @click="openSettings">Server Settings</button> -->
        </div>
        <br>
        <p>
            Click here to <a href="" @click.prevent="addServer">add your server</a> before be able to login
        </p>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                selectedServer: null,
                servers: [
                    { id: 1, name: 'Server 1' },
                    { id: 2, name: 'Server 2' },
                    { id: 3, name: 'Server 3' }
                ]
            };
        },
        methods: {
            addServer () {
                alert('ok')
            },
            login() {
                // Validate inputs
                if (!this.username || !this.password || !this.selectedServer) {
                    alert('Please fill in all fields.');
                    return;
                }
                // Perform login logic
                alert('Login successful!'); 
            },
            openSettings() {
                console.log('Opening server settings...');
            }
        }
    };
</script> 

<style scoped>
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
        background-color: #007BFF;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>