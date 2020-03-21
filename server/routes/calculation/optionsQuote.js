module.exports = {

    getOptionsQuote(req, res, next) {
        req.body.answer.optionsQuote = {callOI:0, putOI:0, callVol:0, putVol:0}
        for(const [date, strikes] of req.body.answer.chain){
            for(const option of strikes){
                req.body.answer.optionsQuote.callOI += option.callOI
                req.body.answer.optionsQuote.putOI += option.putOI
                
                req.body.answer.optionsQuote.callVol += option.callVol
                req.body.answer.optionsQuote.putVol += option.putVol

            }
        }
        next()
    }
    
}