module.exports = (jwt) => {
    return (req, res, next) => {
        if(req.header('authorization') != undefined && req.header('authorization').split(' ')[0] == "Bearer"){
            jwt.verify(req.header('authorization').split(' ')[1], secretOrKey, function(err, decoded) {
                if(err){
                    res.sendStatus(401)
                }
                else{
                    next()
                }
            })
        }
        else res.sendStatus(401)
    }
}