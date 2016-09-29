import albumsData from '../jsons/titlesWithReleases.json';
import releasesData from '../jsons/averageLengthOfTrack.json';
import dataChart from './fourth-albums.js';
import averagesDataChart from './fourth-average.js';
import {pipe, prop, filter, sort, contains, pick, map, sortBy, negate, reduce} from 'ramda';


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

//let getTotalAverage = pipe(
//	prop('media'),
//	reduce(
//		plus,
//		0,
//		reduce(pipe(
//			prop('length'),
//			plus
//		),0,prop('tracks'))
//	)
//);

const toSeconds = (mili) => {
	return Math.trunc(mili/1000);
};

const getTrackLongest = ({tracks}) => {
	return reduce((acc, song) => {
		let songLength = prop('length', song);
		return acc > songLength ? acc : songLength}, 0, tracks);
};

const getMax = (releasesData) => {
	return toSeconds(reduce((acc, cd) => {return acc > cd ? acc : cd}, 0, map(getTrackLongest, prop('media', releasesData))));
};

const getTrackTotalLength = ({tracks}) => {
	return reduce((acc, song) => {return acc + prop('length', song)}, 0, tracks);
};

const getTotalAverage = (releasesData) => {
	let totalLength = reduce ((acc, cd) => {return acc + getTrackTotalLength(cd)}, 0, prop('media', releasesData));
	let totalCount = reduce ((acc, cd) => {return acc + cd.tracks.length}, 0, prop('media', releasesData));
	return toSeconds(totalLength/totalCount);
};

const getTrackAverages = (releasesData) => {
	return map((cd)=>{
		return toSeconds(getTrackTotalLength(cd) / cd.tracks.length);
	},prop('media', releasesData));
};

export const releasesAverage = () => {
	console.log('getMax: ',getMax(releasesData));
	console.log('getTotalAverage: ',getTotalAverage(releasesData));
	console.log('getTrackAverages: ',getTrackAverages(releasesData));

	const averagesData = {
		max: getMax(releasesData),
		average: getTotalAverage(releasesData),
		lengths: getTrackAverages(releasesData)
	};
	
	averagesDataChart(averagesData)
};