import { expect } from 'chai';

import { filterTeamsListBySquadValue, selectArithmeticAverage } from '../teams.selectors';

describe('team selector', () => {
  it('should team selector be defined', () => {
    expect(filterTeamsListBySquadValue, selectArithmeticAverage).to.not.be.equal(undefined);
  });
});
