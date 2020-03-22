module.exports = (key) => (req, res) => {
  res.json({ [key]: req.body.answer[key] });
};
