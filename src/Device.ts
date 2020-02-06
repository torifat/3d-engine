import { RGBA } from './utils';

export class Device {
  private backBuffer: ImageData;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private height: number;
  private width: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = canvas.getContext('2d');
    if (!context) throw new Error('No context!');

    this.context = context;
    this.height = canvas.height;
    this.width = canvas.width;
    this.backBuffer = context.getImageData(0, 0, this.width, this.height);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.backBuffer = this.context.getImageData(0, 0, this.width, this.height);
  }

  present() {
    this.context.putImageData(this.backBuffer, 0, 0);
  }

  putPixel(x: number, y: number, color: RGBA) {
    // 000011112222...
    // RGBARGBARGBA...
    const { data } = this.backBuffer;
    const index = (y * this.width + x) * 4;

    data[index] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = color[3];
  }
}
