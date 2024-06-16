<template>
  <!--<div>
    <a href="https://www.electronjs.org/" target="_blank">
      <img src="./assets/electron.svg" class="logo electron" alt="Electron logo" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>-->
  <!--<HelloWorld msg="SciGate" />-->
  <Login/>
</template>

<script setup lang="ts">
  //import HelloWorld from './components/HelloWorld.vue'
  import Login from './components/Login.vue'
</script>

<style>
  body {
    /*background: url('./assets/curved-calme1.jpg') no-repeat center center fixed;*/
    position: relative;
    /*background: url('./assets/wave.svg') bottom / 100% 5em fixed no-repeat;*/
    background-size: cover;
    background-position: bottom; 
    background-attachment: fixed;
  }  
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo.electron:hover {
    filter: drop-shadow(0 0 2em #9FEAF9);
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
