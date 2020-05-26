class Card {
  constructor(canvas, coverImg) {
    this.coverImg = coverImg;
    this.canvas = canvas;
    this.canvasPosition = canvas.getBoundingClientRect();
    this.ctx = canvas.getContext('2d');
    this.touchesCurrent = null;
    this.down = false;
  }
  /**
    *  如果有提示图层, 则绘图到canvas
    *
    * @memberof Card
  */
  drawImage() {
    const that = this;
    const coverImg = new Image();
    coverImg.src = this.coverImg;
    coverImg.crossOrigin = '';
    coverImg.onload = function() {
      that.ctx.drawImage(coverImg, 0, 0, 300, 150);
    };
  }
  /**
   *
   * 在当前滑动位置画圆
   * @param {*} e
   * @memberof Card
  */
  drawEraser(e) {
    this.ctx.save();
    this.ctx.beginPath();
    const current = this.handlePosition(e);
    this.ctx.arc(current.x, current.y, 10, 0, 2 * Math.PI, false);
    this.ctx.clip();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  /**
  *  将滑动区域连贯(避免出现不连续的圆点)
  *
  * @param {*} e
  * @memberof Card
  */
  handlerMove(e) {
    const a = 10;
    const start = this.handlePosition(this.touchesCurrent);
    const current = this.handlePosition(e);
    const asin = a * Math.sin(Math.atan((current.y - start.y) / (current.x - start.x)));
    const acos = a * Math.cos(Math.atan((current.y - start.y) / (current.x - start.x)));
    const x3 = start.x + asin;
    const y3 = start.y - acos;
    const x4 = start.x - asin;
    const y4 = start.y + acos;
    const x5 = current.x + asin;
    const y5 = current.y - acos;
    const x6 = current.x - asin;
    const y6 = current.y + acos;
    // 保证线条的连贯，所以在矩形一端画圆
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(current.x, current.y, a, 0, 2 * Math.PI);
    this.ctx.clip();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    // 清除矩形剪辑区域里的像素
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x3, y3);
    this.ctx.lineTo(x5, y5);
    this.ctx.lineTo(x6, y6);
    this.ctx.lineTo(x4, y4);
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }
  /**
   *  初始化
   *
   * @memberof Card
   */
  init() {
    if (this.coverImg) {
      this.drawImage();
    } else {
      this.ctx.fillStyle = '#ccc';
      this.ctx.save();
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#E33E33';
      this.ctx.font = '32px Arial';
      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('刮开有惊喜', 150, 75);
    }
    this.setListenerEvent();
  }
  /**
   *  获取手指滑动位置距离canvas的相对位置
   *
   * @param {*} e
   * @returns  手指滑动位置距离canvas的相对位置
   * @memberof Card
   */
  handlePosition(e) {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    return {
      x: currentX - this.canvasPosition.left,
      y: currentY - this.canvasPosition.top
    };
  }

  setListenerEvent() {
    this.canvas.addEventListener('touchstart', this.startHandler.bind(this));
    this.canvas.addEventListener('touchmove', this.moveHandler.bind(this));
    this.canvas.addEventListener('touchend', this.stopHandler.bind(this));
  }

  startHandler(e) {
    this.down = true;
    this.drawEraser(e);
    this.touchesCurrent = e;
  }

  moveHandler(e) {
    if (this.down) {
      this.handlerMove(e);
      this.touchesCurrent = e;
    }
  }
  stopHandler() {
    this.calArea();
  }
  calArea() {
    let pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const transPixels = [];
    pixels.data.map((item, i) => {
      const pixel = pixels.data[i + 3];
      if (pixel === 0) {
        transPixels.push(pixel);
      }
    });
    if (transPixels.length / pixels.data.length > 0.6) {
      this.canvas.style.transition = 'all 2s linear';
      this.canvas.style.opacity = '0';
      setTimeout(() => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), 2000);
    }
  }
}

export default Card;
