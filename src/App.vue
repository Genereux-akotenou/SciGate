<template>
  <router-view></router-view>
</template>
<script setup lang="ts"></script>
<style>
  .header h1 {
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
    display: flex;
    align-items: center;
  }

  .menu li img {
    width: 1em;
    margin-right: 0.2em;
  }

  .menu li:hover,
  .menu li.active {
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

  .logo_dashboard {
    background-color: #fff;
    padding: 0.3em 0.4em;
    color: #000;
    display: inline-flex;
    align-items: center;
    border-radius: 2px;
  }
  div:where(.swal2-container) h2:where(.swal2-title) {
    font-size: 1.6em;
  }
  .swal2-popup{
    font-size: 0.9em !important;
  }
  div:where(.swal2-container) input:where(.swal2-input){
    border: 1px solid #b6b6b6 !important;
  }
  .g-pop{
    display: flex;
    flex-direction: column;
  }
  .g-pop input{
    margin: 0.5em 0;
    height: 2.15em;
  }
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
  .header h1{
  font-size: 1.2em;
}
.dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
