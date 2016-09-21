import {some} from '../src/first.js';
import _ from 'lodash';

describe('some', () => {
  let sampleArray, sampleObject;

  beforeEach(() => {
    sampleArray = [0, 1, 2];
    sampleObject = {
      zero: {
        value: 0
      },
      one: {
        value: 1
      },
      two: {
        value: 2
      }
    }
  });

  it('should iterate over object', () => {
    //expect(some(sampleObject, ))
  })
})