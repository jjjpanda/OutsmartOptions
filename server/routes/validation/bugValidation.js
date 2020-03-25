const Validator = require('validator');

module.exports = {

    validateIP(req, res, next){
        const {ip} = req.body
        if( ip == undefined){
            res.json({ error: true, details: "Validation Error from validateIP in bugValidation" })
        }
        else if(!Validator.isIP(ip)){
            res.json({ error: true, details: "IP Address Incorrect from validateIP in bugValidation" })
        }
        else {
            next()
        }     
    },

    validateOptions(req, res, next){
        const {options} = req.body
        if( options === undefined ){
            res.json({ error: true, details: "Validation Error from validateOptions in bugValidation" })
        }
        else{
            next()
        }
    },

    validateFile(req, res, next){
        if(req.files != undefined){
            const {file} = req.files;
            if(file === undefined || file.data === undefined || !(file.data instanceof Buffer)){
                res.json({ error: true, details: "Validation Error from validateFile in bugValidation" })
            }
            else{
                next()
            }
        }
        else{
            res.json({ error: true, details: "Validation Error from validateFile in bugValidation" })
        }
    }
}