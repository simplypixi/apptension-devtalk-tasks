import { expect } from 'chai';

import { DEFAULT_LOCALE } from '../locales.constants';


describe('locales constant', () => {
  it('should default locales be defined', () => {
    expect(DEFAULT_LOCALE).to.not.be.equal(undefined);
  });
});
