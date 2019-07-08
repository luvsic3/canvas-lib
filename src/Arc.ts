import inRange from 'lodash/inRange';
import Shape, { ShapeAttrs, MousePosition } from './Shape';

export interface ArcAttrs extends ShapeAttrs {
  radius: number;
  startAngle?: number;
  endAngle?: number;
  anticlockwise?: boolean | undefined;
}

const PI2 = Math.PI * 2;
export default class Arc<D = any> extends Shape<ArcAttrs, D> {
  type = 'arc';
  /**
   * Creates an instance of Arc shape.
   * @param {ArcAttrs} attrs
   * @memberof Arc
   */
  constructor(attrs: ArcAttrs) {
    super(attrs);
  }
  makeArcPath(ctx: CanvasRenderingContext2D) {
    const {
      startAngle = 0,
      endAngle = PI2,
      anticlockwise = false,
      radius,
    } = this.attrs;
    const [x, y] = this._getPositionFromShape();
    this.path = new Path2D();
    this.path.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    this.path.closePath();
  }
  render(ctx: CanvasRenderingContext2D) {
    this.makeArcPath(ctx);
    if (!this.path) return;
    this.fillOrStroke(ctx, this.path);
  }
  isPointInShape(ctx: CanvasRenderingContext2D, e: MousePosition) {
    return this._isPointInShapePath(ctx, e);
  }
}
