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
