<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
}
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
html {
  font-size: 62.5%;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: #303133;
}
</style>
