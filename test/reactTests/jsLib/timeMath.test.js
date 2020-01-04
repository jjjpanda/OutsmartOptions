import * as math from '../../../src/jsLib/timeLibrary';

describe('Time Till Expiry Test', () => {
  it('Tests Percentage', () => {
    expect(math.percentageOfYear(14)).toBe(14 / 365);
    expect(math.percentageOfYear(720)).toBe(720 / 365);
    expect(math.percentageOfYear(14)).not.toBe(15 / 365);
  });

  it('Tests Time Between 2 Different Dates', () => {
    expect(math.timeBetweenDates(new Date(2020, 5, 1), new Date(2020, 1, 1))).toBe(121);
    expect(math.timeBetweenDates(new Date(2020, 1, 1), new Date(2020, 5, 1))).toBe(-121);
  });
  it('Tests Time Between Same Date', () => {
    expect(math.timeBetweenDates(new Date(2020, 1, 1), new Date(2020, 1, 1))).toBe(0);
  });

  it('Tests Time Till Expiry', () => {
    expect(math.timeTillExpiry(new Date(2020, 1, 1)))
      .toBe(math.timeBetweenDates(new Date(2020, 1, 1), new Date()) / 365);
    expect(math.timeTillExpiry(new Date(1999, 4, 4)))
      .toBe(math.timeBetweenDates(new Date(1999, 4, 4), new Date()) / 365);
  });
});

describe('Increment Test', () => {
  it('Increment One Day', () => {
    expect(math.incrementOneDay(new Date(2000, 4, 3)))
      .toMatchObject(new Date(2000, 4, 4));
  });
});

describe('String Date Conversion Test', () => {
  it('Date to String', () => {
    expect(math.dateToString(new Date(2000, 4, 13))).toBe('2000-05-13');
    expect(math.dateToFormattedString('2000-4-12')).toBe('4/12/2000');
    expect(math.dateToFormattedString('2000-04-12')).toBe('04/12/2000');
  });

  it('String to Date', () => {
    expect(math.stringToDate('2000-4-12')).toMatchObject(new Date(2000, 3, 12));
    expect(math.stringToDate('2000-04-12')).toMatchObject(new Date(2000, 3, 12));
  });
});
