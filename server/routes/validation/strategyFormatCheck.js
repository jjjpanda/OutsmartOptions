module.exports = strategyFormatCheck = (req, res, next) => {
    if (!(req.body.strategy instanceof Array)) {
      res.json({ error: true, details: 'Badly Formatted Strategies, Not Array' });
      return;
    }
    for (const strat of req.body.strategy) {
      if (!(strat instanceof Object)) {
        res.json({ error: true, details: 'Badly Formatted Strategies, Not Array of Objects' });
        return;
      }
    }
    next();
};