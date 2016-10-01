import {reduceRight} from '../src/first.js';
import {reduceRight as ramdaReduceRight} from 'ramda';

describe('reduceRight', () => {
  let sumUp, sampleArray, concat;

  beforeEach(() => {
    sampleArray = [0, 1, 2, 3, 4];
    sumUp = (previousValue, currentValue) => previousValue + currentValue;
    concat = (previousValue, currentValue) => previousValue.concat(currentValue)
  })
  it('should sum up all values within an array (without initialValue)', () => {
    const reducedArray = reduceRight(sumUp, null, sampleArray);
    expect(reduceRight(sumUp, null, sampleArray)).toEqual(ramdaReduceRight(sumUp, null, sampleArray))
  });

  it('should sum up all values within an array (with initialValue)', () => {
    const reducedArray = reduceRight(sumUp, 10, sampleArray);
    expect(reducedArray).toEqual(ramdaReduceRight(sumUp, 10, sampleArray))
  });

  it('should flatten an array of arrays', () => {
    const arrayOfArrays = [[0, 1], [2, 3], [4, 5]],
      flattenedArray = reduceRight(concat, [], arrayOfArrays);
    //dziwne zachowanie, bo js'owy reduce right zwraca elementy w odwrotnej kolejności
    expect(flattenedArray).toEqual(ramdaReduceRight(concat, [], arrayOfArrays))
  })
})