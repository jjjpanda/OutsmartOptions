module.exports = (req, res, next) => {
    if(req.body == undefined){
        res.json({ error: true, details: 'Validation Error from validateBody in validateBody' })
    }
    else{
        next()
    }
}