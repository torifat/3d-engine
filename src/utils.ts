import { Matrix } from './matrix';

export type Point2D = [number, number];
export type Point3D = [number, number, number];

export const zero = (): Point3D => [0, 0, 0];
export const up = (): Point3D => [0, 1, 0];

export type RGBA = [number, number, number, number];

export const translationMatrix = ([x, y, z]: Point3D): Matrix => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [x, y, z, 1],
];

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
