import { Camera } from './Camera';
import { Matrix, multiply } from './matrix';
import { Mesh } from './Mesh';
import { Point3D, RGBA, up } from './utils';
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

  render(camera: Camera, meshes: Array<Mesh> = []) {
    const viewMatrix = camera.lookAt(up());

    const projectionMatrix = this.getPerspectiveProjectionMatrix(
      0.78,
      this.width / this.height,
      0.01,
      1.0,
    );

    meshes.forEach(mesh => {
      const [x, y, z] = mesh.position;
      const worldMatrix = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [x, y, z, 1],
      ];

      const transformMatrix = multiply(
        multiply(worldMatrix, viewMatrix),
        projectionMatrix,
      );

      mesh.vertices.forEach(vertex =>
        this.drawPoint(this.project(vertex, transformMatrix)),
      );
    });
  }

  // https://www.codeguru.com/cpp/misc/misc/graphics/article.php/c10123/Deriving-Projection-Matrices.htm#page-3
  getPerspectiveProjectionMatrix(
    fov: number,
    aspectRatio: number,
    zNear: number,
    zFar: number,
  ): Matrix {
    const depth = zFar - zNear;
    // cot(fov/2);
    const a = 1 / Math.tan(fov / 2);
    const b = zFar / depth;
    const c = -(zFar * zNear) / depth;
    return [
      [a / aspectRatio, 0, 0, 0],
      [0, a, 0, 0],
      [0, 0, b, 1],
      [0, 0, c, 0],
    ];
  }
}
