<template>
  <div class="nav-block">
    <router-link :to="to" class="link">
      {{text}}
      <van-icon name="arrow" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['to', 'text']
};
</script>

<style lang="scss" scoped>
.nav-block {
  color: #323233;
  padding: 0 1rem 0 2rem;
  margin: 0 0 1.2rem;
  border-radius: 10rem;
  line-height: 4rem;
  background: #f7f8fa;
  .link {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
