const express = require('express')
const app = express()
const port = process.env.PORT; //change to 8181 or whatever when localhosting 

app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))