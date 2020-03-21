module.exports = (key) => {
    return (req, res) => {
        res.json({[key]: req.body.answer[key]})
    }
}
