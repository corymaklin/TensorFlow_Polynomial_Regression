import * as tf from '@tensorflow/tfjs';

export function generateData(numPoints, coeff, stdDev = 0.04) {
    return tf.tidy(() => {
        //  Create 4 coefficients
        const [a, b, c, d] = [tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c), tf.scalar(coeff.d)];

        //  Generate n random values for x between -1 and 1
        const xs = tf.randomUniform([numPoints], -1, 1);

        //  Generate n random values for y
        const ys = a.mul(xs.pow(tf.scalar(3)))
            .add(b.mul(xs.square()))
            .add(c.mul(xs))
            .add(d)
            //  We add some randomness
            .add(tf.randomNormal([numPoints], 0, stdDev));

        //  Normalize the values of y to the range 0 to 1 so that the model trains more easily
        const ymin = ys.min();
        const ymax = ys.max();
        const yrange = ymax.sub(ymin);
        const ysNormalized = ys.sub(ymin).div(yrange);

        return {
            xs,
            ys: ysNormalized
        };
    });
}