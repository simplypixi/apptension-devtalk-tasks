import quotes from './quotes.js';
import {layout, errorLayout} from './layout';
import {googleAPI} from '../config.js';
import {isFunction, isUndefined, random, debounce} from 'lodash';
import Meme from './meme';
import $ from 'jquery';

//ES2015: Map
const createMap = obj => new Map(Object.entries(obj));
const searchImageByQuery = query => $.get(googleAPI.url, {
	//ES2016: Spread object
	...googleAPI.config,
	q: query
});

const isPromise = obj => !isUndefined(obj) && isFunction(obj.then);

//ES2015: Defaults
const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setTimeout(() => next(iter, callback, val));
    });
  } else {
    setTimeout(() => next(iter, callback, value));
  }
};

const createSync = (fn) =>
	//ES2015: Rest && spread && PPromise
  (...args) => new Promise(resolve => next(fn(...args), res => resolve(res)));

//ES2015: Generator
const asyncGen = function* () {
	const results = yield searchImageByQuery(...arguments);
	yield results;
}

const getImage = createSync(asyncGen);

const quotesMap = createMap(quotes);

const getRandomDate = quotesMap => [...quotesMap.keys()][random(0, quotesMap.size - 1)];
//ES2015: Spread, Destructuring, find
const getRandomQuote = randomDate => [...quotesMap.entries()].find(([date]) => date === randomDate)[1];

const getUrl = ({pagemap: {cse_thumbnail: images}}) => images[0].src;

//ES2015: Generator
const genMemeContent = function* () {
  for (;;) {
  	const randomDate = getRandomDate(quotesMap);
    yield new Meme(getRandomQuote(randomDate), randomDate);;
  }
}

const addMeme = () => {
    const meme = genMemeContent();
    const newMeme = meme.next().value;
    //ES2015: Destructuring
    getImage('Zbigniew Boniek').then(({items}) => {
        newMeme.imageUrl = getUrl(items[random(0, items.length - 1)]);
        layout(newMeme);
    }); 
}

export const run = () => {
	const dates = quotesMap.keys();
	const meme = genMemeContent();

  addMeme();
	setInterval(() => {
		addMeme();
	}, 10000);
}