
export function getFetchReq(req, qs, callback) {
  processResponse(
    fetch(req,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
        qs
      }
    ),
    callback
  )
}

export function postFetchReq(req, body, callback) {
  processResponse(
    fetch(req,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }
    ), 
    callback
  )
}

export function postFetchReqAuth(req, auth, body, callback) {
  processResponse(
    fetch(req,
      {
        method: 'post',
        headers: {
          Authorization: auth,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }
    ),
    callback
  )
}

function processResponse(promise, callback){
  promise
  .then(res => res.text())
  .then((res) => {
    try {
      const resp = JSON.parse(res)
      return resp
    } catch (e) {
      return res
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