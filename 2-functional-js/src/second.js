import {reduce} from 'ramda';

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