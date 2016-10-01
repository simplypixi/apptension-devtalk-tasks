import {words} from '../src/second.js';

describe('words', () => {
  it('return a list of words in a string', function() {
    expect(words('a b c')).toEqual(['a', 'b', 'c']);
  });
})