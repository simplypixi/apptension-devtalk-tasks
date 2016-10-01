import {forEach} from '../src/third.js';

describe('recursive forEach', () => {
  let sampleArray, sampleArrayOfObjects;

  beforeEach(() => {
    sampleArray = [1, 2, 3];
    sampleArrayOfObjects = [{n: 10}, {n: 20}, {n: 30}];
  });

  it('returns the original list', function() {
    let s = '';
    expect(forEach(sampleArrayOfObjects, i => s += i.n)).toEqual(sampleArrayOfObjects);
    expect(s).toEqual('102030');

    let t = '';
    expect(forEach(sampleArray, n => t += n)).toEqual(sampleArray);
    expect(t).toEqual('123');
  });

  it('handles empty list', function() {
    expect(forEach([], x => x * x)).toEqual([]);
  });
})