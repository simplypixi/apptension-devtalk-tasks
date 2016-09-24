import $ from 'jquery';
import {map} from 'ramda';
import Mustache from 'mustache';

const averagesData = {
  max: 1000, //need to find max (to proper scale chart)
  average: 700,
  lengths: [
    1000,
    600,
    300
  ]
};
function convertData(data) {
  const totalAverage ={
    text: data.average, //todo convert to min sec format
    value: (data.average / data.max) * 100
  };

  const averages = map((len) => ({
    text: len,
    value: (len / data.max) * 100
  }), data.lengths);

  return {
    totalAverage,
    averages
  };
}

function loadChartData(data) {
  const template = $('#chart-template').html();
  Mustache.parse(template);
  const rendered = Mustache.render(template, convertData(data));
  $('#chart').html(rendered);
}


export default function () {
  loadChartData(averagesData);
}


