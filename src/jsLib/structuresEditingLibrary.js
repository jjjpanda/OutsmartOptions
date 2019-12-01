export function mapToObject(map) {
  const obj = Object.create(null);
  for (const [k, v] of map) {
    obj[k] = v;
  }
  return obj;
}

export function objectToMap(object) {
  const map = Object.entries(object);
  for (const value of map) {
    value[1] = Object.entries(value[1]);
  }
  return map;
}
