module.exports = {
    qValidation(req, res, next) {
        const { q } = req.body;
        if( q == undefined ){
            res.status(400).json({ error: true, details: "Validation Error from qValidation in twitterValidation" })
        }
        else{
            next()
        }
    }
}