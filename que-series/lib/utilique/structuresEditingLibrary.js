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

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

export function dataToGraphConversion(data) {
  const dataConverted = [];

  const keyNameObj = { x: 0 };
  for (var option of data) {
    for (var i = data[0].profit.length - 1, factor = Math.round(data[0].profit.length / 7) + 1; i >= 0; i -= factor) {
      keyNameObj[`${option.key}a${option.profit[i][0]}`] = 0;
    }
  }
  for (var j = 0; j < data[0].profit[0][1].length; j++) {
    // console.log(option.key+ option.profit[i][0]+ option.profit[i][1][j])
    dataConverted.push({ ...keyNameObj });
    dataConverted[dataConverted.length - 1].x = data[0].profit[0][1][j][0];
  }
  for (var option of data) {
    for (var i = data[0].profit.length - 1, factor = Math.round(data[0].profit.length / 7) + 1; i >= 0; i -= factor) {
      for (var j = 0; j < data[0].profit[i][1].length; j++) {
        dataConverted[j][`${option.key}a${option.profit[i][0]}`] = option.profit[i][1][j][1];
      }
    }
  }
  return dataConverted;
}

export function dataToTableConversion(data) {
  const dataConverted = [];

  for (let i = data[0][1].length - 1, end = 0; i >= end; i--) {
    const o = {};
    o.x = data[0][1][i][0].toFixed(2);
    for (const date of data) {
      o[date[0]] = date[1][i][1].toFixed(2);
    }
    dataConverted.push(o);
  }
  return dataConverted;
}