<template>
  <div class='wheel'>
    <div class='wheel-block'>
      <canvas id='canvas' ref='canvas' width="270" height="270"></canvas>
    </div>
  </div>
</template>

<script>
import Wheel from './wheel';
export default {
  data() {
    return {
      canvas: null,
      awards: ['10元话费1', '谢谢参与2', '10积分3', '20元话费4', '谢谢参与5', '100元京东E卡6', '京豆x10 7', '幸运大锦鲤8']
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    const wheel = new Wheel({
      canvas: this.canvas,
      awards: this.awards,
      times: 3,
      finished: (index) => {
        alert(`你获得的奖品是:${index}---${this.awards[index]}`);
      },
      outTimes: () => {
        alert('你的次数已用完');
      }
    });
    wheel.init();
  },
  methods: {
    easeOut(t, b, c, d) {
      let t1 = t;
      if ((t1 /= d / 2) < 1) return c / 2 * t1 * t1 + b;
      return -c / 2 * ((--t1) * (t1 - 2) - 1) + b;
    },
    calAwardResult(arr) {
      // 随机奖品索引值
      return Math.floor(Math.random() * arr.length);
    }
  }
};
</script>

<style lang='scss' scoped>
.wheel {
  display: flex;
  flex-direction: column;
  align-items: center;
  #canvas {
    width: 27rem;
    height: 27rem;
  }
}
</style>
