<template>
  <router-view></router-view>
</template>
<script setup lang="ts"></script>
<style>
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
</style>
