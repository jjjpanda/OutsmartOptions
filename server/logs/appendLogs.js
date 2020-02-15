const fs = require('fs')
module.exports = (filePath, str) => {
    fs.appendFile(filePath, str+'\n', (err) => {
        if (err) {
            console.log("Append to " + filePath + " Failed")
        } else {
        }
      })
    console.log(str)
}