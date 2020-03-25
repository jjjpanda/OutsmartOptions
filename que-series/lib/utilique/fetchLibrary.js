export function postFetchReq(req, body, callback, auth) {
  fetch(req,
    {
      method: 'post',
      headers: {
        Authorization: auth == undefined ? "" : auth,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }
  )
  .then(res => res.text())
  .then((res) => {
    try {
      const resp = JSON.parse(res)
      return resp
    } catch (e) {
      return { error: true, details: "Response Error at Client Parse" }
    }
  })
  .then((data) => callback(data))
}

export function fileReq(req, fd) {
  fetch(req,
    {
      method: 'post',
      body: fd,
    }
  );
}