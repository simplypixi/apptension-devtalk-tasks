import {reduce} from 'ramda';

// --- forEach ---
export const forEach = (fn, list) => reduce((l, value) => {fn(value); return l;}, list, list);

// --- map ---
export const map = (fn, list) => reduce((a, value) => a.concat(fn(value)), [], list);

