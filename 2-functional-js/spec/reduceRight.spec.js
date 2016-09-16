import reduceRight from '../src/reduceRight.js';

describe('reduceRight', () => {
  let sumUp, sampleArray, concat;

  beforeEach(() => {
    sampleArray = [0, 1, 2, 3, 4];
    sumUp = (previousValue, currentValue) => previousValue + currentValue;
    concat = (previousValue, currentValue) => previousValue.concat(currentValue)
  })
  it('should sum up all values within an array (without initialValue)', () => {
    const reducedArray = reduceRight(sampleArray, sumUp);
    expect(reducedArray).toEqual(sampleArray.reduceRight(sumUp))
  });

  it('should sum up all values within an array (with initialValue)', () => {
    const reducedArray = reduceRight(sampleArray, sumUp, 10);
    expect(reducedArray).toEqual(sampleArray.reduceRight(sumUp, 10))
  });

  it('should flatten an array of arrays', () => {
    const arrayOfArrays = [[0, 1], [2, 3], [4, 5]],
      flattenedArray = reduceRight(arrayOfArrays, concat, []);
    //dziwne zachowanie, bo js'owy reduce right zwraca elementy w odwrotnej kolejności
    expect(flattenedArray).toEqual(arrayOfArrays.reduceRight(concat, []))
  })
})