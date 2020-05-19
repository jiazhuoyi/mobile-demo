<template>
  <div class="home">
    <img class="logo" src="static/logo/logo.png" alt="">
    <home-nav>
      <nav-block text="刮刮卡" to="/card"></nav-block>
      <nav-block text="幸运转盘" to="/wheel"></nav-block>
    </home-nav>
  </div>
</template>

<script>
import HomeNav from '@/components/home-nav';
import NavBlock from '@/components/nav-block';
export default {
  name: 'Home',
  components: {
    HomeNav,
    NavBlock
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  padding-top: 5rem;
  text-align: center;
  .logo {
    width: 20rem;
    height: 20rem;
  }
}
</style>
