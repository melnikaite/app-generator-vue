<template>
  <div id="app">
    <b-container>
      <img class="logo" src="./assets/logo.png">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  font-weight: 900;
  font-size: 150%
}

img.logo {
  height: 40px
}
</style>
