import * as tf from '@tensorflow/tfjs';
import { generateData } from './data';
import { plotDataAndPredictions } from './ui';

const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

const num = 100;
const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);

function predict(x) {
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(3)))
      .add(b.mul(x.square()))
      .add(c.mul(x))
      .add(d)
  });
}

function loss(preds, ys) {
  return preds.sub(ys).square().mean();
}

function train(xs, ys, num) {
  for(let i=0; i<num; i++) {
    optimizer.minimize(() => {
      const pred = predict(xs);
      return loss(pred, ys);
    });
    console.log(`Epoch ${i} a: ${a.dataSync()[0]}, b: ${b.dataSync()[0]}, c: ${c.dataSync()[0]}, d: ${d.dataSync()[0]}`)
  }
}

document.getElementById('train').addEventListener('click', () => {
  const realCoefficients = {
    a: -.8,
    b: .3,
    c: .5,
    d: .8
  }
  console.log(`Initial values a: ${a.dataSync()[0]}, b: ${b.dataSync()[0]}, c: ${c.dataSync()[0]}, d: ${d.dataSync()[0]}`)

  const { xs, ys } = generateData(50, realCoefficients);
  train(xs, ys, num);

  plotDataAndPredictions(document.querySelector('div'), xs, ys, predict(xs));
});