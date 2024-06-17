<template>
  <div class="dashboard">
    <header class="header">
      <h1>
        <span class="logo_dashboard">S</span> - {{ site }}
      </h1>
      <button @click="logout" class="logout-button">Logout</button>
    </header>
    <div class="main-content">
      <nav class="menu">
        <ul>
          <li :class="{ active: currentMenu === 'dashboard' }" @click="navigateTo('dashboard')">
            <img src="../assets/dashboard.png" /> Dashboard
          </li>
          <li :class="{ active: currentMenu === 'filesystem' }" @click="navigateTo('filesystem')">
            <img src="../assets/folder.png" /> Filesystem
          </li>
          <li :class="{ active: currentMenu === 'resource' }" @click="navigateTo('resource')">
            <img src="../assets/chip.png" /> Resource
          </li>
          <li :class="{ active: currentMenu === 'tasks' }" @click="navigateTo('tasks')">
            <img src="../assets/project-management.png" /> Tasks
          </li>
          <li :class="{ active: currentMenu === 'profile' }" @click="navigateTo('profile')">
            <img src="../assets/user.png" /> Profile
          </li>
          <li :class="{ active: currentMenu === 'shell' }" @click="navigateTo('shell')">
            <img src="../assets/linux.png" /> Shell
          </li>
        </ul>
        <div>
          {{ formattedTime }}
        </div>
      </nav>
      <div class="content">
        <p>Profile</p>
      </div>
      <div class="side-band">
        <button  @click="navigateTo('shell')" class="open-shell-button">
          <img style="width: 1.5em;" src="../assets/terminal.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(['site', 'currentMenu', 'elapsedTime']),
    ...mapGetters(['formattedTime']),
  },
  methods: {
    ...mapMutations(['setCurrentMenu']),
    updateTime() {
      this.$store.dispatch('updateElapsedTime');
    },
    logout() {
      clearInterval(this.timer);
      this.$router.push('/');
    },
    openShell() {
      console.log('Shell opened');
    },
    navigateTo(section) {
      this.setCurrentMenu(section);
      this.$router.push(`/${section}`);
    },
  },
};
</script>

<style scoped>
</style>
