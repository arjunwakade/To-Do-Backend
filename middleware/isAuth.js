const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: 'Not authorized' });
};

module.exports = isAuthenticated;