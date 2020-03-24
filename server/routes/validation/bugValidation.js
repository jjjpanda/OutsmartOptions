module.exports = {

    validateIP(req, res, next){
        const {ip} = req.body
        if( ip == undefined || !(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))){
            res.json({ error: true, details: "Validation Error from validateIP in bugValidation" })
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
        const {file} = req.files;
        if(file === undefined || file.data === undefined || !(file.data instanceof Buffer)){
            res.json({ error: true, details: "Validation Error from validateFile in bugValidation" })
        }
        else{
            next()
        }
    }
}