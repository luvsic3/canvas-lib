import inRange from 'lodash/inRange';
import Shape, { ShapeAttrs } from './Shape';

export interface RectAttrs extends ShapeAttrs {
  radius?: number[];
  width: number;
  height: number;
}

export default class Rect extends Shape<RectAttrs> {
  type = 'rect';
  path = new Path2D();
  constructor(attrs: RectAttrs) {
    super(attrs);
  }
  makeRectPath(ctx: CanvasRenderingContext2D) {
    const {
      x,
      y,
      width,
      height,
      radius = [],
      strokeStyle,
      fillStyle,
    } = this.attrs;
    const [leftTop = 0, rightTop = 0, rightBottom = 0, leftBottom = 0] = radius;
    this.path = new Path2D();
    // 左上角
    if (leftTop) {
      this.path.moveTo(x, y + leftTop);
      this.path.arc(x + leftTop, y + leftTop, leftTop, Math.PI, Math.PI * 1.5);
    } else {
      this.path.moveTo(x, y);
    }
    // border-top
    this.path.lineTo(x + width - rightTop, y);

    // 右上角
    if (rightTop) {
      this.path.arc(
        x + width - rightTop,
        y + rightTop,
        rightTop,
        Math.PI * 1.5,
        Math.PI * 2,
      );
    } else {
      this.path.lineTo(x + width, y);
    }

    // border-right
    this.path.lineTo(x + width, y + height - rightBottom);

    // 右下角
    if (rightBottom) {
      this.path.arc(
        x + width - rightBottom,
        y + height - rightBottom,
        rightBottom,
        0,
        Math.PI * 0.5,
      );
    } else {
      this.path.lineTo(x + width, y + height);
    }

    // border-bottom
    this.path.lineTo(x - leftBottom, y + height);
    // 左下角
    if (leftBottom) {
      this.path.arc(
        x + leftBottom,
        y + height - leftBottom,
        leftBottom,
        Math.PI * 0.5,
        Math.PI,
      );
    } else {
      this.path.lineTo(x, y + height);
    }

    this.path.closePath();
  }
  render(ctx: CanvasRenderingContext2D) {
    const { strokeStyle, fillStyle } = this.attrs;
    this.makeRectPath(ctx);
    this.fillOrStroke(ctx, this.path)
  }
  isPointInShape(ctx: CanvasRenderingContext2D, px: number, py: number) {
    return ctx.isPointInPath(this.path, px, py);
  }
}