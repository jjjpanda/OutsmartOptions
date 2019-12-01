const ms_per_day = 1000 * 60 * 60 * 24;

export function getCurrentDate() {
  return new Date();
}

export function timeBetweenDates(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return (Math.floor((utc1 - utc2) / ms_per_day));
}

export function percentageOfYear(t) {
  return t / 365.0; // returned as percentage of year
}

export function timeTillExpiry(expiry) {
  const current = getCurrentDate();
  return percentageOfYear(timeBetweenDates(expiry, current));
}

export function incrementOneDay(d) {
  d.setDate(d.getDate() + 1);
  return d;
}

export function dateToString(d) {
  return (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
}

export function stringToDate(strDate) {
  strDate = strDate.split('-');
  return new Date(strDate[0], (strDate[1] - 1), strDate[2]);
}

export function dateToFormattedString(strDate) {
  strDate = strDate.split('-');
  return `${strDate[1]}/${strDate[2]}/${strDate[0]}`;
}
