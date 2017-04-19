import { expect } from 'chai';

import { teamsActions, teamsActionsTypes } from '../teams.actions';

describe('locales action', () => {
  it('should proper action and types to be defined', () => {
    expect(teamsActions, teamsActionsTypes).to.not.be.equal(undefined);
  });
});

