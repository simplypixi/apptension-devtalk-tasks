import {map} from '../src/first.js';

describe('map:', () => {
  const times2 = (x) => x * 2;
  const inc = (x) => x + 1;


  it('maps simple functions over array', function() {
    expect(map(times2, [1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    expect(map(inc, [1, 2, 3, 4])).toEqual([2, 3, 4, 5]);
  });

  it('maps simple functions over array of objects', function() {
    const times2prop = ({n}) => ({x: n * 2});
    expect(map(times2prop, [{n: 1}, {n: 2}, {n: 3}])).toEqual([{x: 2}, {x: 4}, {x: 6}]);
  });

  it('works on empty arrays', function() {
    expect(map(times2, [])).toEqual([]);
  });
})