import { expect } from 'chai';

import { selectLocalesLanguage } from '../locales.selectors';

describe('locales selector', () => {
  it('should locales selector be defined', () => {
    expect(selectLocalesLanguage).to.not.be.equal(undefined);
  });
});
