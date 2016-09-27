import {reduce} from 'ramda';

// --- forEach ---
export const forEach = (fn, list) => reduce((l, value) => {fn(value); return l;}, list, list);

// --- map ---
export const map = (fn, list) => reduce((a, value) => [...a, fn(value)], [], list);

// --- filter ---
export const filter = (fn, list) => reduce((acc, value) => {
	if (fn(value)) {
		return acc.concat(value);
	}
	return acc;
}, [], list);

// --- reduceRight ---
export const reduceRight = (fn, initialValue, array) => reduce(fn, initialValue, [...array].reverse());

// --- some ---
export const some = function () {
	let [collection, predicate] = arguments,
		matcher = typeof predicate,
		matchers = {
			function: (fn, value) => fn(value),
			object: (obj, value) => reduce((currentState, key) => currentState || Object.is(value[key], obj[key]), false, Object.keys(obj)),
			string: (str, value) => value[str] && Boolean(value[str]),
			array: (arr, value) =>  value[arr[0]] === arr[1]
		},
		reductor = (currentState, value) => currentState || matchers[matcher](predicate, value);

	if (!collection.constructor.toString().includes("Array")) {
		collection = [collection];
	}

	if (predicate.constructor.toString().includes("Array")) {
		matcher = 'array';
	}
	return reduce(reductor, false, collection);
};

