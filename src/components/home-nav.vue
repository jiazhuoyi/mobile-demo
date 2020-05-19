<template>
  <div class="home-nav">
    <div class="home-nav-title">常见demo</div>
    <div class="home-nav-group">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-nav {
  padding: 1.5rem;
  text-align: left;
  &-title {
    color: rgba(69, 90, 100, 0.6);
    font-size: 1.4rem;
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
}
</style>
