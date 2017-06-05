import { expect } from 'chai';
import { fromJS } from 'immutable';
import { times, constant } from 'lodash';

import { filterTeamsListBySquadValue, selectArithmeticAverage } from '../teams.selectors';

describe('team selector', () => {
  it('should team selector be defined', () => {
    expect(filterTeamsListBySquadValue, selectArithmeticAverage).to.not.be.equal(undefined);
  });

  describe('filterTeamsListBySquadValue', () => {
    it('should proper filter data (limit max)', () => {
      const state = fromJS({
        teams: {
          list: [
            { name: 'FC One', squadMarketValue: '10,000,000 €' },
            { name: 'FC Two', squadMarketValue: '2,000,000 €' },
          ],
          rangeValues: { min: 0, max: 5 },
        },
      });
      const filtered = filterTeamsListBySquadValue(state);

      expect(filtered.size).to.be.equal(1);
      expect(filtered.getIn([0, 'name'])).to.be.equal('FC Two');
    });

    it('should proper filter data (limit min)', () => {
      const state = fromJS({
        teams: {
          list: [
            { name: 'FC One', squadMarketValue: '10,000,000 €' },
            { name: 'FC Two', squadMarketValue: '2,000,000 €' },
          ],
          rangeValues: { min: 5, max: 15 },
        },
      });
      const filtered = filterTeamsListBySquadValue(state);

      expect(filtered.size).to.be.equal(1);
      expect(filtered.getIn([0, 'name'])).to.be.equal('FC One');
    });

    it('should proper filter data (both limit)', () => {
      const state = fromJS({
        teams: {
          list: [
            { name: 'FC One', squadMarketValue: '10,000,000 €' },
            { name: 'FC Two', squadMarketValue: '2,000,000 €' },
          ],
          rangeValues: { min: 0, max: 1 },
        },
      });
      const filtered = filterTeamsListBySquadValue(state);

      expect(filtered.size).to.be.equal(0);
    });
  });

  describe('average', () => {
    it('should proper count average', () => {
      const fcOne = times(10, constant({ name: 'FC One', squadMarketValue: '1,000,000 €' }));
      const fcTwo = times(10, constant({ name: 'FC Two', squadMarketValue: '2,000,000 €' }));

      const state = fromJS({ teams: { list: [...fcOne, ...fcTwo], rangeValues: { min: 0, max: 600 } } });

      expect(selectArithmeticAverage(state)).to.be.equal(1500000);
    });

    it('should proper count average with limit', () => {
      const fcOne = times(20, constant({ name: 'FC One', squadMarketValue: '1,000,000 €' }));
      const fcTwo = times(10, constant({ name: 'FC Two', squadMarketValue: '30,000,000 €' }));

      const state = fromJS({ teams: { list: [...fcOne, ...fcTwo], rangeValues: { min: 0, max: 2 } } });

      expect(selectArithmeticAverage(state)).to.be.equal(1000000);
    });
  });
});
