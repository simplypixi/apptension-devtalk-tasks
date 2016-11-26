import quotes from './quotes.js';
import {googleAPI} from '../config.js';
import $ from 'jquery';

const buildMap = obj => new Map(Object.entries(obj));
const searchImageByQuery = query => $.get(googleAPI.url, {
	...googleAPI.config,
	q: query
});

const isPromise = (obj) => typeof obj !== 'undefined' &&
  typeof obj.then === 'function';

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val));
    });
  } else {
    setImmediate(() => next(iter, callback, value));
  }
};

const createSync = (fn) =>
  (...args) => new Promise(resolve => next(fn(...args), res => resolve(res)));

const getImage = createSync(function* () {
  const results = yield searchImageByQuery(...arguments);
  yield results;
});

export default () => {
	const quotesMap = buildMap(quotes);

	getImage('Zbigniew Boniek').then(({items}) => console.log(items));

	console.log(quotesMap.entries())
};