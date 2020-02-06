import { zero, Point3D } from './utils';

export class Camera {
  constructor(
    private position: Point3D = zero,
    private target: Point3D = zero,
  ) {}
}
