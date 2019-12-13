var http = require('http')
const env = require('dotenv').config();

module.exports = () => {
    setInterval(() => {
        http.get('http://localhost:'+process.env.PORT, (res) => {
            if (!res.error && res.statusCode == 200) {
                console.log("~Server Warmed for Another 5 Minutes~")
            }
            else{
                console.log("~Server Cooled Down; Oops~")
            }
        })
    }, 300000)
}