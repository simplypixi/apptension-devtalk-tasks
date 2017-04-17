import { expect } from 'chai';

import { localesActions, localesActionsTypes } from '../locales.actions';

const SET_LANGUAGE = 'SET_LANGUAGE';

const typeObj = { SET_LANGUAGE };

describe('locales action', () => {
  it('should proper action and types to be defined', () => {
    expect(localesActions, localesActionsTypes).to.not.be.equal(undefined);
  });
  it('should proper type be defined', () => {
    expect(typeObj).to.deep.equal(localesActionsTypes);
  });
  it('should return proper type', () => {
    expect(localesActions.setLanguage().type).to.equal(SET_LANGUAGE);
  });
});

