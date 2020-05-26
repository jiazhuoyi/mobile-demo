<template>
  <div class="card">
    <div class="title">刮刮乐</div>
    <div class="main">
      <div class="content">
        <img src="./result.png" class="pic">
      </div>
      <canvas class="canvas" ref="canvas" id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import Card from './card';

export default {
  mounted() {
    this.canvas = this.$refs.canvas;
    const imageUrl = 'https://cdn.jiazhuoyi.cn/card.jpg';
    const card = new Card(this.canvas, imageUrl);
    card.init();
  }
};
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  position: relative;
  .title {
    font-size: 3.2rem;
    background-color: #B20218;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
  }
  .main {
    position: relative;
  }
  .content {
    position: absolute;
    left: 0;
    width: 100%;
    height: 15rem;
    .pic {
      width: 100%;
      height: 100%;
    }
  }
  .canvas {
    position: absolute;
    width: 100%;
    height: 15rem;
    left: 0;
    z-index: 2;
  }
}
</style>
