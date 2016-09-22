import {reduce} from 'ramda';

// --- forEach ---
export const forEach = (fn, list) => reduce((l, value) => {fn(value); return l;}, list, list);

// --- map ---
export const map = (fn, list) => reduce((a, value) => [...a, fn(value)], [], list);

// --- reduceRight ---
export const reduceRight = (fn, initialValue, array) => reduce(fn, initialValue, [...array].reverse());

// --- some ---
export const some = (array, ...args) => [].reduce.call(Object.keys(array), args);