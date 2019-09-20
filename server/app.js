const express = require('express')
const app = express()
const port = 8181

app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))