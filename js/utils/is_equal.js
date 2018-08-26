module.exports = (a, b) => {
  const EPSILON = 0.00001;

  return Math.abs(a - b) < EPSILON
};
