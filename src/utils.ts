import { Matrix, multiply } from './matrix';

export type Point2D = [number, number];
export type Point3D = [number, number, number];

export const zero = (): Point3D => [0, 0, 0];
export const up = (): Point3D => [0, 1, 0];

export type RGBA = [number, number, number, number];

// https://en.wikipedia.org/wiki/Rotation_matrix#Determining_the_angle
export function transform({
  translation = [0, 0, 0],
  rotation: [xTheta, yTheta, zTheta] = [0, 0, 0],
}: {
  translation?: Point3D;
  rotation?: [number, number, number];
}): Matrix {
  const [tx, ty, tz] = translation;

  const xc = Math.cos(xTheta); // a
  const xs = Math.sin(xTheta); // b
  const yc = Math.cos(yTheta); // x
  const ys = Math.sin(yTheta); // y
  const zc = Math.cos(zTheta); // l
  const zs = Math.sin(zTheta); // m

  // http://bit.ly/2vuMpKl
  return [
    [zc * yc + xs * zs * ys, xs * zc * ys - zs * yc, xc * ys, 0],
    [xc * zs, xc * zc, -xs, 0],
    [xs * zs * yc - zc * ys, xs * (zc * yc) + zs * ys, xc * yc, 0],
    [tx, ty, tz, 1],
  ];
}

// https://www.codeguru.com/cpp/misc/misc/graphics/article.php/c10123/Deriving-Projection-Matrices.htm#page-3
export function perspectiveProjectionMatrix(
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
