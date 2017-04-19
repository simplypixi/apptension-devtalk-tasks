import { expect } from 'chai';
import { fromJS } from 'immutable';
import { times, constant } from 'lodash';

import { filterTeamsListBySquadValue, selectArithmeticAverage } from '../teams.selectors';

describe('team selector', () => {
  it('should team selector be defined', () => {
    expect(filterTeamsListBySquadValue, selectArithmeticAverage).to.not.be.equal(undefined);
  });

  describe('average', () => {
    it('should proper count average', () => {
      const fcOne = times(10, constant({name: 'FC One', squadMarketValue: '1,000,000 €'}));
      const fcTwo = times(10, constant({name: 'FC Two', squadMarketValue: '2,000,000 €'}));

      const state = fromJS({teams: {list: [...fcOne, ...fcTwo], rangeValues: {min: 0, max: 600}}});

      expect(selectArithmeticAverage(state)).to.be.equal(1500000);
    });
  });

});


