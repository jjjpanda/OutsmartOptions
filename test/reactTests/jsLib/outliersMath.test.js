import * as math from '../../../src/jsLib/outliersLibrary';

describe('Test Basic Prob-Stats', () => {
  it('Tests Mean', () => {
    expect(math.getMean([1, 2, 3, 4])).toBe(2.5);
    expect(math.getMean([])).toBeNaN();
  });
  it('Tests Standard Deviation', () => {
    expect(math.getSD([1, 2, 3, 4])).toBeCloseTo(1.118);
    expect(math.getSD([1, 1, 1, 1])).toBe(0);
  });
});
