class Wheel {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.canvas.getContext('2d');
    this.width = options.canvas.width;
    this.height = options.canvas.height;
    this.awards = options.awards;
    this.awardAngle = Math.PI * 2 / options.awards.length;
    this.start = 0;
    this.x = options.canvas.width / 2; // 圆心x坐标
    this.y = options.canvas.height / 2; // 圆心y坐标
    this.start = 0;
    this.movingTime = 0;
    this.during = 2000;
    this.awardIndex = 0;
    this.down = false;
    this.finished = options.finished;
    this.outTimes = options.outTimes;
    this.times = options.times;
    this.count = 0;
  }
  init() {
    this.calDevicePixelRatio(this.canvas);
    this.drawWheel();
    this.drawPointer();
    this.canvasStyle = this.canvas.getAttribute('style');
    // 判断鼠标是否在中间按钮位置，有则显示成可点击
    this.canvas.addEventListener('mousemove', (e) => {
      const position = this.handlePosition(e);
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
      if (this.ctx.isPointInPath(position.x, position.y) && !this.down) {
        this.canvas.setAttribute('style', `cursor: pointer;${this._canvasStyle}`);
      } else {
        this.canvas.setAttribute('style', this.canvasStyle);
      }
    });
    // 判断鼠标点击事件是否在中间位置
    this.canvas.addEventListener('mousedown', (e) => {
      const position = this.handlePosition(e);
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 30, 0, Math.PI * 2, false);
      if (this.ctx.isPointInPath(position.x, position.y) && !this.down) {
        this.down = true;
        this.awardIndex = this.calAwardResult(this.awards);
        this.rotateRect();
      }
    });
    // 判断手指点击事件是否在中间位置
    this.canvas.addEventListener('touchstart', (e) => {
      const position = this.handlePosition(e);
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 4, this.canvas.height / 4, 30 + 20, 0, Math.PI * 2, false);
      if (this.ctx.isPointInPath(position.x * 2, position.y * 2) && !this.down) {
        if (this.count >= this.times) {
          this.outTimes();
          return;
        }
        this.down = true;
        this.awardIndex = this.calAwardResult(this.awards);
        this.rotateRect();
      }
    });
  }
  calDevicePixelRatio(canvas) {
    const devicePixelRatio = window.devicePixelRatio;
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    // this.x *= devicePixelRatio;
    // this.y *= devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  drawWheel() {
    // 背景图
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.fillStyle = '#FF6766';
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, this.height / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // 绘制六个扇形
    for (let i = 0; i < this.awards.length; i++) {
      const startRadian = this.start + this.awardAngle * i; // 每一个奖项所占的起始弧度
      const endRadian = startRadian + this.awardAngle; // 每一个奖项的终止弧度
      this.ctx.save();
      if (i % 2 === 0) {
        this.ctx.fillStyle = '#FFFA01';
      } else {
        this.ctx.fillStyle = '#5fcbd4';
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height / 2); // 将原点移动至圆心
      this.ctx.arc(this.width / 2, this.height / 2, this.height / 2 - 10, startRadian, endRadian, false);
      this.ctx.fill();
      this.ctx.restore();
      this.ctx.save();
      // 为每个扇形添加文字
      this.ctx.font = '14px Helvetica, Arial';
      if (i % 2 === 0) {
        this.ctx.fillStyle = '#FF6766';
      } else {
        this.ctx.fillStyle = '#FFF';
      }
      this.ctx.translate(
        this.width / 2 + Math.cos(startRadian + this.awardAngle / 2) * 100,
        this.height / 2 + Math.sin(startRadian + this.awardAngle / 2) * 100
      );
      this.ctx.rotate(startRadian + this.awardAngle / 2 + Math.PI / 2);
      this.ctx.fillText(this.awards[i], -this.ctx.measureText(this.awards[i]).width / 2, 0);
      this.ctx.restore();
    }
  }
  drawPointer() {
    // 绘制指针
    this.ctx.save();
    this.ctx.fillStyle = '#FDC964';
    // this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y - 30 - 28);
    this.ctx.lineTo(this.x - 8, this.y - 28);
    this.ctx.lineTo(this.x + 8, this.y - 28);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();

    // 绘制按钮
    this.ctx.save();
    this.ctx.fillStyle = '#FDC964';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.restore();

    // 绘制按钮上的文字
    this.ctx.save();
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px Helvetica, Arial';
    this.ctx.beginPath();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillText('开始', -this.ctx.measureText('开始').width / 2, -6);
    this.ctx.fillText('抽奖', -this.ctx.measureText('抽奖').width / 2, 12);
    this.ctx.restore();
  }
  handlePosition(e) {
    const canvasPosition = this.canvas.getBoundingClientRect();
    // console.log('e:', e, this.isPC());
    // const currentX = this.isPC() ? e.clientX : e.touches[0].clientX;
    // const currentY = this.isPC() ? e.clientY : e.touches[0].clientY;
    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;
    return {
      x: currentX - canvasPosition.left,
      y: currentY - canvasPosition.top
    };
  }
  rotateRect() {
    // 旋转
    if (this.movingTime >= this.during) {
      const half = this.awardAngle / 2;
      const index = this.awardIndex;
      const result = this.start % (Math.PI * 2);
      // 获取中奖区间
      const angle = (Math.PI * 2) / this.awards.length;
      const temp = Math.PI * 2 - Math.PI / 2 - half - angle * index;
      const destination = temp > 0 ? temp : (Math.PI * 2 - Math.abs(temp));
      if (Math.abs(result - destination) < 0.1) {
        this.result = 0;
        this.movingTime = 0;
        this.down = false;
        this.count++;
        this.finished(this.awardIndex);
        return;
      }
    }
    this.movingTime += 20;
    this.start += (Math.PI * 2) / 80;
    this.drawWheel();
    this.drawPointer();
    window.requestAnimationFrame(this.rotateRect.bind(this));
  }
  isPC() {
    const userAgentInfo = navigator.userAgent;
    let flag = true;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  calAwardResult(arr) {
    // 随机奖品索引值
    return Math.floor(Math.random() * arr.length);
  }
}

export default Wheel;
