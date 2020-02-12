import { Device } from './Device';
import { Mesh } from './Mesh';
import { Camera } from './Camera';

// Stop continuous rendering
const DEBUG_FRAME_STEP = false;

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
  cube.rotation[0] %= 360;
  cube.rotation[1] += 0.01;
  cube.rotation[1] %= 360;
  cube.rotation[2] += 0.01;
  cube.rotation[2] %= 360;

  d.render(c, meshes);
  d.present();

  if (!DEBUG_FRAME_STEP) {
    requestAnimationFrame(drawingLoop);
  }
}

requestAnimationFrame(drawingLoop);

document.getElementById('control-panel').addEventListener('click', event => {
  // Clicked a button
  if (event.target instanceof HTMLButtonElement) {
    const { index, value } = event.target.dataset;
    c.position[index] += +value;
    if (DEBUG_FRAME_STEP) {
      requestAnimationFrame(drawingLoop);
    }
  }
});

document.addEventListener('keydown', event => {
  switch (event.code) {
    case 'ArrowLeft':
      c.position[0] -= 0.5;
      break;
    case 'ArrowRight':
      c.position[0] += 0.5;
      break;
    case 'ArrowUp':
      c.position[event.shiftKey ? 2 : 1] -= 0.5;
      break;
    case 'ArrowDown':
      c.position[event.shiftKey ? 2 : 1] += 0.5;
      break;
  }

  if (DEBUG_FRAME_STEP) {
    requestAnimationFrame(drawingLoop);
  }
});
