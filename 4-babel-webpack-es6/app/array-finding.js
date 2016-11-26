import {renderLayout} from './utils';

const types = {
  league: 'league',
  national: 'national team'
};

const career = [
  {years: '1973–1975', place: 'Zawisza Bydgoszcz', goals: 14, matches: 41, type: types.league},
  {years: '1975–1982', place: 'Widzew Łódź', goals: 50, matches: 172, type: types.league},
  {years: '1982–1985', place: 'Juventus', goals: 14, matches: 81, type: types.league},
  {years: '1985–1988', place: 'Roma', goals: 17, matches: 76, type: types.league},
  {years: '1976–1988', place: 'Polska', goals: 24, matches: 80, type: types.national}
];

function getNationalCarrer() {
  //ES2015: New function for finding an element in an array.
  return career.find(({type}) => type === types.national);
}

function getLeagueCarrer() {
  return career.filter(({type}) => type === types.league);
}
export default function() {
 console.info(getNationalCarrer(), getLeagueCarrer()); //temp
  renderLayout(
    getNationalCarrer(),
    '#national-carrer-template',
    '#carrer-in-national-team'
  );
}