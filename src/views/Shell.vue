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
      <div class="content" style="max-width: 100%;">
        <vShell style="height: ;"
          :banner="banner"
          :shell_input="send_to_terminal"
          :commands="commands"
          @shell_output="prompt"
        ></vShell>
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
import vShell from '../components/v-shell.vue'

export default {
  name: 'Dashboard',
  components: {
    vShell
  },
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
    prompt(value) {
      if (value == "node -v") {
        this.send_to_terminal = process.versions.node;
      }
    }
  },
  data() {
    return {
      send_to_terminal: "",
      banner: {
        // header: "Vue Shell",
        // subHeader: "Shell is power just enjoy 🔥",
        // helpHeader: 'Enter "help" for more information.',
        emoji: {
            // first: "🔅",
            // second: "🔆",
            time: 750
        },
        // sign: "VueShell $",
        // img: {
        //     align: "left",
        //     link: "../assets/chip.png",
        //     width: 100,
        //     height: 100
        // }
      },
      commands: [
        { name: "info",
          desc: "Show information about this terminal",
          get() {
            return `<p>With ❤️ By Salah Bentayeb @halasproject.</p>`;
        }
        },
        {
          name: "uname",
          desc: "Show the current terminal name",
          get() {
            return navigator.appVersion;
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
