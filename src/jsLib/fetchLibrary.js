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
    .catch((error) => {
        console.log(error);
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
  })
  .catch((error) => {
    console.log(error);
  });
}
