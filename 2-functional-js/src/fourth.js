import albumsData from '../jsons/titlesWithReleases.json';
import releasesData from '../jsons/averageLengthOfTrack.json';
import dataChart from './fourth-albums.js';
import averagesDataChart from './fourth-average.js';
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
};

let getMax = pipe(
    prop('media')
);
let getTotalAverage = pipe(
    prop('media')
);
let getTrackAverages = pipe(
    prop('media')
);

export const releasesAverage = () => {
    console.log('getMax: ',getMax(releasesData));
    console.log('getTotalAverage: ',getTotalAverage(releasesData));
    console.log('getTrackAverages: ',getTrackAverages(releasesData));

    // const averagesData = {
    //     max: getMax,
    //     average: getTotalAverage,
    //     lengths: getTrackAverages
    // };
	
	const averagesData = {
		max: 1000, //need to find max (to proper scale chart)
		average: 700,
		lengths: [
			1000,
			650,
			300
		]
	};
	averagesDataChart(averagesData)
};