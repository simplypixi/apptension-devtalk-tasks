import $ from 'jquery';
import {addIndex, map} from 'ramda';
import Mustache from 'mustache';

/*const albumsData = [
  {
    name: 'Pumba',
    details: [
      {label: 'Release date', value: '29/09/2016'},
      {label: 'Duration', value: '3min 4s'}
    ]
  },
  {
    name: 'Mickey Mouse',
    details: [
      {label: 'Release date', value: '29/09/2016'},
      {label: 'Duration', value: '2min 40s'}
    ]
  },
  {
    name: 'Goofy Groove',
    details: [
      {label: 'Release date', value: '29/09/2016'},
      {label: 'Duration', value: '3min 21s'}
    ]
  }
];*/

const mapIndexed = addIndex(map);

function colorWrapper(data) {
  const colorMap = ['red', 'orange', 'amber', 'green', 'light-green', 'lime'];
  const count = colorMap.length;
  return {
    albums: mapIndexed((album, i) => ({
      title: album.title, date: album['first-release-date'],
      color: colorMap[i % count]
    }), data)
  };
}

function loadAlbums(data) {
  const template = $('#album-template').html();
  Mustache.parse(template);
  const rendered = Mustache.render(template, colorWrapper(data));
  $('#albums-list').html(rendered);
}


export default function albums(albumsData) {
  loadAlbums(albumsData);
}
