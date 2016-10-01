import {increaseNumbers} from '../src/second.js';

describe('increaseNumbers', () => {
  it('should increase every integer in array', function() {
    expect(increaseNumbers([1, 2, 3, 4, 5])).toEqual([2, 3, 4, 5, 6]);
  });

  it('should increase every float in array', function() {
    expect(increaseNumbers([1.5, 2.212, 3.1, 4.4, 5.4])).toEqual([2.5, 3.212, 4.1, 5.4, 6.4]);
  });

  it('should increase every number in array', function() {
    expect(increaseNumbers([1.5, 2, 3.1, 4.4, 5])).toEqual([2.5, 3, 4.1, 5.4, 6]);
  });

  it('should increase only number in array', function() {
    expect(increaseNumbers(["1.5", "2", "Some string", 1.9])).toEqual([2.5, 3, "Some string", 2.9]);
  });
})