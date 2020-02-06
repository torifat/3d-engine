import { Device } from './Device';

const canvas = document.querySelector('canvas');

if (canvas) {
  const d = new Device(canvas);

  d.clear();
  d.putPixel(5, 5, [255, 0, 0, 255]);
  d.putPixel(6, 6, [0, 255, 0, 255]);
  d.putPixel(7, 7, [0, 0, 255, 255]);
  d.present();
}
