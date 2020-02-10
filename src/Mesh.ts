import { Point3D, zero } from './utils';

type Triangle = [number, number, number];

export class Mesh {
  public position: Point3D = zero();
  public rotation: Point3D = zero();
  public vertices: Array<Point3D> = [];
  public faces: Array<Triangle> = [];

  constructor(name: string, vertices = [], faces = []) {
    console.log(`${name} constructed!`);
    this.vertices = vertices;
    this.faces = faces;
  }
}
