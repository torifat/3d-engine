import { Camera } from './Camera';
import { Matrix, multiply } from './matrix';
import { Mesh } from './Mesh';
import {
  perspectiveProjectionMatrix,
  Point3D,
  RGBA,
  translationMatrix,
  up,
} from './utils';
// TODO: make `import type` after upgrading to tsc 3.8
import { Vector } from './vector';

export class Device {
  private backBuffer: ImageData;
  private context: CanvasRenderingContext2D;
  private height: number;
  private width: number;

  constructor(canvas: HTMLCanvasElement) {
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

    data[index] = color[0] * 255;
    data[index + 1] = color[1] * 255;
    data[index + 2] = color[2] * 255;
    data[index + 3] = color[3] * 255;
  }

  project(vertex: Point3D, transform: Matrix) {
    // Homogeneous coordinates
    const point = multiply([[...vertex, 1]], transform);

    // Cartesian coordinates
    // Perspective divide (normalization)
    const point_x = point[0][0] / point[0][3];
    const point_y = point[0][1] / point[0][3];

    const x = Math.floor(point_x * this.width + this.width / 2.0);
    const y = Math.floor(-point_y * this.height + this.height / 2.0);
    return [x, y];
  }

  drawPoint([x, y]: Vector) {
    // Clipping
    if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
      this.putPixel(x, y, [1, 1, 0, 1]);
    }
  }

  drawLine(from: Vector, to: Vector) {
    this.drawBLine(from, to);
    // TODO: Try https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm
    // const d = v.subtract(to, from);
    // const distance = v.norm(d);
    // if (distance < 2) return;

    // const midPoint = v.add(from, v.multiply(d, 0.5));
    // this.drawPoint(midPoint.map(Math.floor));
    // this.drawLine(from, midPoint);
    // this.drawLine(midPoint, to);
  }

  // https://en.wikipedia.org/wiki/Bresenham's_line_algorithm
  drawBLine(from: Vector, to: Vector) {
    let x0 = Math.floor(from[0]);
    let y0 = Math.floor(from[1]);
    const x1 = Math.floor(to[0]);
    const y1 = Math.floor(to[1]);
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.drawPoint([x0, y0]);

      if (x0 == x1 && y0 == y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  render(camera: Camera, meshes: Array<Mesh> = []) {
    const viewMatrix = camera.lookAt(up());

    const projectionMatrix = perspectiveProjectionMatrix(
      0.78,
      this.width / this.height,
      0.01,
      1.0,
    );

    meshes.forEach(mesh => {
      const worldMatrix = translationMatrix(mesh.position);

      const transformMatrix = multiply(
        multiply(worldMatrix, viewMatrix),
        projectionMatrix,
      );

      for (let i = 0; i < mesh.vertices.length - 1; ++i) {
        const from = this.project(mesh.vertices[i], transformMatrix);
        const to = this.project(mesh.vertices[i + 1], transformMatrix);
        this.drawLine(from, to);
      }

      mesh.faces.forEach(face => {
        const a = this.project(mesh.vertices[face[0]], transformMatrix);
        const b = this.project(mesh.vertices[face[1]], transformMatrix);
        const c = this.project(mesh.vertices[face[2]], transformMatrix);

        this.drawLine(a, b);
        this.drawLine(b, c);
        this.drawLine(c, a);
      });

      // mesh.vertices.forEach(vertex =>
      //   this.drawPoint(this.project(vertex, transformMatrix)),
      // );
    });
  }
}
