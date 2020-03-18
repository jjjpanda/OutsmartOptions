export function fetchReq(req, body, callback) {
  fetch(req,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
    .then((res) => res.json())
    .then(
      (data) => callback(data),
    );
}

export function fetchReqAuth(req, auth, body, callback) {
  fetch(req,
    {
      method: 'post',
      headers: {
        Authorization: auth,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
    .then((res) => res.json())
    .then(
      (data) => callback(data),
    );
}

export function fileReq(req, fd) {
  fetch(req,
    {
      method: 'post',
      body: fd,
    });
}