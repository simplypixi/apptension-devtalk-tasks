import {reduce} from 'ramda';

// --- forEach ---
const forEach = (func, array) => {
  reduce(func, null, array);
  return array;
};

// --- map ---
const map = (f, array) => reduce((a, v) => a.concat(f(v)), [], array);