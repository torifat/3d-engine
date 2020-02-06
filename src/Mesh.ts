import { zero, Point3D } from './utils';

export class Mesh {
  private position: Point3D = zero;
  private rotation: Point3D = zero;
  private vertices: Array<Point3D> = [];

  constructor(name: string, vertices = []) {
    this.vertices = vertices;
  }
}
