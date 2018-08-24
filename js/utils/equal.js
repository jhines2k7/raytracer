module.exports = (a, b) => {
  const EPSILON = 0.00001;
  
  if(Math.abs(a - b) < EPSILON){
    return true;
  } else {
    return false;
  }
}
