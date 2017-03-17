<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div style="display: in-line; padding: 5px;">
      <router-link to="/form">Form</router-link>
      <router-link to="/list">List</router-link>
      <router-link to="/bar">BarChart</router-link>
      <router-link to="/line">LineChart</router-link>
    </div>
    <router-view></router-view>
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
  margin-top: 60px;
}
</style>
