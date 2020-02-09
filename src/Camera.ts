import { Point3D, zero } from './utils';
import { cross, dot, normalize, subtract } from './vector';

const enum LookAtDirection {
  Left,
  Right,
}

export class Camera {
  constructor(
    public position: Point3D = zero(),
    public target: Point3D = zero(),
  ) {}

  // https://web.archive.org/web/20131222170415/http:/robertokoci.com/world-view-projection-matrix-unveiled/
  lookAt(up: Point3D, direction: LookAtDirection = LookAtDirection.Left) {
    // Position === Eye
    const eye = this.position;

    // Forward vector
    const z = normalize(
      direction === LookAtDirection.Left
        ? subtract(this.target, eye)
        : subtract(eye, this.target),
    );
    // Right vector
    const x = normalize(cross(up, z));
    // Up vector
    const y = cross(z, x);
    return [
      [x[0], y[0], z[0], 0],
      [x[1], y[1], z[1], 0],
      [x[2], y[2], z[2], 0],
      [-dot(x, eye), -dot(y, eye), -dot(z, eye), 1],
    ];
  }
}
