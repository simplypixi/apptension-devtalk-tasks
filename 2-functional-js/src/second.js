import {reduce, split} from 'ramda';

// --- return a list of words in a string ---
export const words = string => split(' ', string);

// --- return a list of words in a string ---
function add(a, b) {
  return a + b;
}

export const increaseNumbers = array => {
  return array.map(item => {
    const isNumber = !isNaN(parseFloat(item)) && isFinite(item);
    return isNumber ? add(parseFloat(item), 1) : item;
  })
}

// --- find the smallest number in an array ---
function less(a, b) {
  return a < b ? a : b;
}

export const smallest = (list) => {
  if (list.length) {
    return reduce(less, list[0], list)
  } else {
    return null;
  }
}