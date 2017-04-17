import { expect } from 'chai';

import { selectLocalesLanguage } from '../locales.selectors';

describe('locales selector', () => {
  it('should default locales be defined', () => {
    expect(selectLocalesLanguage).to.not.be.equal(undefined);
  });
});
