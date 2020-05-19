<template>
  <div class="layout">
    <van-nav-bar
      left-text="返回"
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft">
    </van-nav-bar>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
