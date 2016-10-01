import {some} from '../src/first.js';
import _ from 'lodash';

describe('some', () => {
  let sampleArray, sampleObject;

  beforeEach(() => {
    sampleArray = [0, 1, 2];
    sampleObject = [{
        value: 0,
        active: false 
      }, {
        value: 1
      }, {
        value: 2,
        active: true
      }
    ]
  });

  it('should get function as predicate', () => {
    expect(some(sampleArray, Boolean)).toEqual(_.some(sampleArray, Boolean));
  })

  it('should iterate over object\'s array by key (e.g key "active")', () => {
    expect(some(sampleObject, 'active')).toEqual(_.some(sampleObject, 'active'));
  });

  it('should iterate over object\'s array by key value (e.g field ["active", "no"])', () => {
    expect(some(sampleObject[0], ['active', 'no'])).toEqual(_.some(sampleObject[0], ['active', 'no']));
  });

  it('should iterate over object\'s array by object (e.g field {active: false, value: 0}])', () => {
    expect(some(sampleObject, sampleObject[0])).toEqual(_.some(sampleObject, sampleObject[0]));
  })
})