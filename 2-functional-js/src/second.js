import {reduce, filter, map, split} from 'ramda';

// --- return a list of words in a string ---
export const words = split(' ');

// --- return a list of words in a string ---
function add(a, b) {
  return a + b;
}

export const increaseNumbers = array => {
  return array.map(item => {
    const isNumber = !isNaN(parseFloat(item)) && isFinite(item);
    return isNumber ? add(parseFloat(item), 1) : item;
  })
};

// --- find the smallest number in an array ---
function less(a, b) {
  return a < b ? a : b;
}

export const smallestReduce = (list) => {
  const filteredList = reduce((array, item) => {
    const isNumber = !isNaN(parseFloat(item)) && isFinite(item);
    return isNumber ? [...array, parseFloat(item)] : array;
  }, [], list);

  return filteredList.length ? reduce(less, filteredList[0], filteredList) : null;
};

export const smallestMap = (list) => {
    const listEditor = (list) => {
        return map((current) => {return less(list[0], current);}, list);
    };

    // return list.length > 1 ? smallestMap(listEditor(list)) : list[0];
    return true;
};

export const smallestFilter = (list) => {
    const listReductor = (list) => {
        let filteredList =  filter((current) => {return current === less(list[0], current);}, list);
        return filteredList.length < list.length ? filteredList : filteredList.slice(1);
    };
    
    return list.length > 1 ? smallestFilter(listReductor(list)) : list.length ? list[0] : null;
};