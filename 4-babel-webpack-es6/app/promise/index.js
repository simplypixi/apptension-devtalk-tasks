//ES2015: Modules export/import
import {sampleSize, chunk} from 'lodash';

import {layout, errorLayout} from './layout';
import {newsApiKey, readingErrorMsg} from '../config';
import {Newspaper, MultiNewspapers} from './newspaper';

function successAction(articles) {
  layout(chunk(sampleSize(articles, 6), 2));
  return articles;
}

function getUrl(source) {
  //ES2015: Template Literals
  return `https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=${newsApiKey}`;
}

export default function () {
  const urlItalia = getUrl('football-italia');
  const urlFour = getUrl('four-four-two');

  //ES2015: Arrow functions
  const news = new MultiNewspapers(urlItalia, urlFour);
  news.getArticles()
    .then((response) => successAction(response))
    .catch((response) => errorLayout({message: readingErrorMsg}));
}