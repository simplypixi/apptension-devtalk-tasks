import { createSelector } from 'reselect';
import { toNumber, round } from 'lodash';

const MULTIPLIER = 1000000;
const COUNT_OF_TEAMS = 20;


const selectTeamsDomain = state => state.get('teams');

export const selectTeamsList = createSelector(
  selectTeamsDomain, state => state.get('list')
);

export const selectRangeValues = createSelector(
  selectTeamsDomain, state => state.get('rangeValues')
);

export const filterTeamsListBySquadValue = createSelector(
  selectTeamsList,
  selectRangeValues,
  (teams, rangeValues) => teams.filter((team) => {
    const squadMarket = toNumber(team.get('squadMarketValue').replace(' €', '').replace(/,/g, ''));

    return squadMarket > rangeValues.min() * MULTIPLIER && squadMarket < rangeValues.max() * MULTIPLIER;
  })
);

export const selectArithmeticAverage = createSelector(
  filterTeamsListBySquadValue, state => {
    const sum = state.reduce((prevVal, element) => {
      const squadMarket = toNumber(element.get('squadMarketValue').replace(' €', '').replace(/,/g, ''));

      return prevVal + squadMarket;
    }, 0);

    return round(sum / COUNT_OF_TEAMS);
  }
);
