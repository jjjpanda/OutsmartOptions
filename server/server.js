const app = require('./app')
const env = require('dotenv').config();

const port = process.env.PORT;
app.listen(port, () => console.log(`Mr. Outsmart is watching port ${port}!`));

require('./js/serverWarmer.js')();
require('./database').connect('dev', () => {})