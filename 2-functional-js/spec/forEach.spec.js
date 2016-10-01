import {forEach} from '../src/first.js';

describe('forEach:', () => {
  let sampleArray, sampleArrayOfObjects;

  beforeEach(() => {
    sampleArray = [1, 2, 3];
    sampleArrayOfObjects = [{n: 10}, {n: 20}, {n: 30}];
  });

  it('returns the original list', function() {
    let s = '';
    expect(forEach(({n}) => s += n, sampleArrayOfObjects)).toEqual(sampleArrayOfObjects);
    expect(s).toEqual('102030');

    let t = '';
    expect(forEach((n) => t += n, sampleArray)).toEqual(sampleArray);
    expect(t).toEqual('123');
  });

  it('handles empty list', function() {
    expect(forEach((x) => x * x, [])).toEqual([]);
  });
})