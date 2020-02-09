import { Point3D, zero } from './utils';

export class Mesh {
  public position: Point3D = zero();
  public rotation: Point3D = zero();
  public vertices: Array<Point3D> = [];

  constructor(name: string, vertices = []) {
    this.vertices = vertices;
  }
}
