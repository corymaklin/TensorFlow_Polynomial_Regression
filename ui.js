import * as tfvis from '@tensorflow/tfjs-vis';
import { generateData } from './data';

export async function plot() {

const coefficients = {
    a: -.8,
    b: -.2,
    c: .9,
    d: .5
  };
  const { xs, ys } = generateData(100, coefficients);
  
  const xvals = await xs.data();
  const yvals = await ys.data();

  const values = Array.from(yvals).map((y, i) => {
    return {x: xvals[i], y: yvals[i]};
  });

  const data = {
      values
  };
  
  const surface = tfvis.visor().surface({ name: 'Scatterplot', tab: 'Data'});
  tfvis.render.scatterplot(data, surface, {});
}