import albumsData from '../jsons/titlesWithReleases.json';
import dataChart from './fourth-albums.js';
import {pipe, prop, filter, sort, contains, pick, map, sortBy, negate} from 'ramda';


export const readAlbums = () => {
	const sortAlbums = (a, b) => new Date(b['first-release-date']) - new Date(a['first-release-date']),
		filterAlbums = pipe(
				prop('release-groups'),
				filter(
					pipe(
						prop('secondary-types'),
						pipe(contains('Compilation'), negate)
					)
				),
				map(pick(['title', 'first-release-date'])),
				sort(sortAlbums)
			);
	dataChart(filterAlbums(albumsData))
}