//ES2015: Modules export/import
import {sampleSize} from 'lodash';

import {layout, errorLayout} from './layout';
import {newsApiKey, readingErrorMsg} from '../config';

function successAction(response) {
  layout({articles: sampleSize(response.articles, 3)});
  return response.articles;
}


export default function () {
  const source = 'football-italia';
  //ES2015: Template Literals
  const url = `https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=${newsApiKey}`;

  //ES2015: Promises - First class representation of a value that may be made asynchronously and be available in the future.
  const promiseExample = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = function () {
      const response = JSON.parse(this.response) || this.statusText;
      if (this.status === 200) {
        // Success
        resolve(response);
      } else {
        // Something went wrong (404 etc.)
        reject(new Error(response.message));
      }
    };
    request.onerror = function () {
      reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
    };
    request.open('GET', url);
    request.send();
  });

  promiseExample
    //ES2015: Arrow functions
    .then((response) => successAction(response))
    .catch((response) => errorLayout({message: readingErrorMsg}));
}