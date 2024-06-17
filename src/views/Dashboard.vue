<template>
  <div class="dashboard">
    <header class="header">
      <h1>
        <span class="logo_dashbaord">
          S
        </span> - 
        {{ site }}
      </h1>
      <button @click="logout" class="logout-button">Logout</button>
    </header>
    <div class="main-content">
      <nav class="menu">
        <ul>
          <li @click="navigateTo('dashboard')">
            <img src="../assets/dashboard.png"/> 
            Dashboard
          </li>
          <li @click="navigateTo('filesystem')">
            <img src="../assets/folder.png"/>
            Filesystem
          </li>
          <li @click="navigateTo('resource')">
            <img src="../assets/chip.png"/>
            Resource
          </li>
          <li @click="navigateTo('tasks')">
            <img src="../assets/project-management.png"/>
            Tasks
          </li>
          <li @click="navigateTo('profile')">
            <img src="../assets/user.png"/>
            Profile
          </li>
          <li @click="navigateTo('shell')">
            <img src="../assets/linux.png"/>
            Shell
          </li>
        </ul>
        <div>
          {{ formattedTime }}
        </div>
      </nav>
      <div class="content">
        <p>Welcome to the dashboard!</p>
      </div>
      <div class="side-band">
        <button @click="openShell" class="open-shell-button">
          <img style="width: 1.5em;" src="../assets/terminal.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      site: localStorage.getItem('site') || 'No site selected',
      startTime: null,
      elapsedTime: 0,
      timer: null
    };
  },
  methods: {
    updateTime() {
      this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    },
    logout() {
      clearInterval(this.timer);
      this.$router.push('/');
    },
    openShell() {
      console.log('Shell opened');
    },
    navigateTo(section) {
      this.$router.push(`/${section}`);
    }
  },
  computed: {
    formattedTime() {
      const hours = String(Math.floor(this.elapsedTime / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((this.elapsedTime % 3600) / 60)).padStart(2, '0');
      const seconds = String(this.elapsedTime % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  mounted() {
    this.startTime = Date.now();
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>

<style scoped>
.header h1{
  font-size: 1.2em;
}
.dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
}

.logout-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  background-color: #51515154;
  border-radius: 3px;
}

.main-content {
  display: flex;
  margin-top: 60px; /* Adjusted to match header height */
  height: calc(100vh - 60px);
}

.menu {
  width: 200px;
  background-color: #f5f5f5;
  padding: 10px;
  border-right: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu li {
  padding: 10px;
  cursor: pointer;
  text-align: left;
  widows: 100%;
}

.menu li img {
  width: 1em;;
}
.menu li:hover {
  background-color: #ddd;
}

.content {
  flex: 1;
  padding: 20px;
}

.side-band {
  width: 2em;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  border-left: 1px solid #ddd;
}

.open-shell-button {
  color: #fff;
  border: none;
  padding: 0px;
  cursor: pointer;
  display: flex;
  border-radius: 3px;
  outline: none;
}

.open-shell-button:hover {
  background: #d3d5d8;
}
.logo_dashbaord{
  background-color: #fff;
  padding: 0.3em 0.4em;
  color: #000;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
}
</style>
