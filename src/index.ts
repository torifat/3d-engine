import { Device } from './Device';
import { Mesh } from './Mesh';
import { Camera } from './Camera';

const canvas = document.querySelector('canvas');
const d = new Device(canvas);
const c = new Camera([0, 0, 10]);
const meshes = [];
const cube = new Mesh(
  'Cube',
  [
    [-1, 1, 1],
    [1, 1, 1],
    [-1, -1, 1],
    [1, -1, 1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],
    [-1, -1, -1],
  ],
  [
    [0, 1, 2],
    [1, 2, 3],
    [1, 3, 6],
    [1, 5, 6],
    [0, 1, 4],
    [1, 4, 5],
    [2, 3, 7],
    [3, 6, 7],
    [0, 2, 7],
    [0, 4, 7],
    [4, 5, 6],
    [4, 6, 7],
  ],
);
meshes.push(cube);

function drawingLoop() {
  d.clear();

  cube.rotation[0] += 0.01;
  cube.rotation[1] += 0.01;

  d.render(c, meshes);
  d.present();
  // requestAnimationFrame(drawingLoop);
}

requestAnimationFrame(drawingLoop);

document.getElementById('left').addEventListener('click', () => {
  c.position[0] -= 0.5;
  requestAnimationFrame(drawingLoop);
});

document.getElementById('right').addEventListener('click', () => {
  c.position[0] += 0.5;
  requestAnimationFrame(drawingLoop);
});
document.getElementById('up').addEventListener('click', () => {
  c.position[1] -= 0.5;
  requestAnimationFrame(drawingLoop);
});

document.getElementById('down').addEventListener('click', () => {
  c.position[1] += 0.5;
  requestAnimationFrame(drawingLoop);
});
document.getElementById('forward').addEventListener('click', () => {
  c.position[2] -= 0.5;
  requestAnimationFrame(drawingLoop);
});

document.getElementById('backward').addEventListener('click', () => {
  c.position[2] += 0.5;
  requestAnimationFrame(drawingLoop);
});
