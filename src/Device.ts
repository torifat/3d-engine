import { Camera } from './Camera';
import { identity, Matrix, multiply } from './matrix';
import { Mesh } from './Mesh';
import { Point3D, RGBA, up } from './utils';
import { Vector } from './vector';

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

    data[index] = color[0] * 255;
    data[index + 1] = color[1] * 255;
    data[index + 2] = color[2] * 255;
    data[index + 3] = color[3] * 255;
  }

  project(vertex: Point3D, transform: Matrix) {
    const point = multiply([[...vertex, 1]], transform);

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

  render(camera: Camera, meshes: Array<Mesh> = []) {
    const viewMatrix = camera.lookAt(up());

    const projectionMatrix = [
      [2.432765007019043, 0, 0, 0],
      [0, 2.432765007019043, 0, 0],
      [0, 0, 1.0202020406723022, 1],
      [0, 0, -0.020202020183205605, 0],
    ];

    meshes.forEach(mesh => {
      const worldMatrix = identity(4);
      worldMatrix[3][0] = mesh.position[0];
      worldMatrix[3][1] = mesh.position[1];
      worldMatrix[3][2] = mesh.position[2];

      const transformMatrix = multiply(
        multiply(worldMatrix, viewMatrix),
        projectionMatrix,
      );

      mesh.vertices.forEach(vertex => {
        const projectedPoint = this.project(vertex, transformMatrix);
        // this.drawPoint([projectedPoint.x, projectedPoint.y]);
        this.drawPoint(projectedPoint);
      });
    });
  }
}
