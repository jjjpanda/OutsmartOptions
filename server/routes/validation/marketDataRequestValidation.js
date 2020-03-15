module.exports = {

    validateTicker(req, res, next) {
        const {ticker} = req.body;
        if(ticker == undefined){
            res.json({ error: true, details: "Validation Error" })
        }
        else{
            next()
        }
    }

}