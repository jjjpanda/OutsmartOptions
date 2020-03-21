module.exports = (req, res, next) => {
    req.body.answer = {}
    next()
}