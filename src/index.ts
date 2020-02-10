import { Device } from './Device';
import { Mesh } from './Mesh';
import { Camera } from './Camera';

const canvas = document.querySelector('canvas');
const d = new Device(canvas);
const c = new Camera([0, 0, 10]);
const meshes = [];
const cube = new Mesh('Cube', [
  [-1, 1, 1],
  [1, 1, 1],
  [-1, -1, 1],
  [-1, -1, -1],
  [-1, 1, -1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
]);
meshes.push(cube);

function drawingLoop() {
  d.clear();

  cube.rotation[0] += 0.01;
  cube.rotation[1] += 0.01;

  d.render(c, meshes);
  d.present();
  requestAnimationFrame(drawingLoop);
}

requestAnimationFrame(drawingLoop);

document.getElementById('left').addEventListener('click', () => {
  c.position[0] -= 0.5;
});

document.getElementById('right').addEventListener('click', () => {
  c.position[0] += 0.5;
});
document.getElementById('up').addEventListener('click', () => {
  c.position[1] -= 0.5;
});

document.getElementById('down').addEventListener('click', () => {
  c.position[1] += 0.5;
});
document.getElementById('forward').addEventListener('click', () => {
  c.position[2] -= 0.5;
});

document.getElementById('backward').addEventListener('click', () => {
  c.position[2] += 0.5;
});
