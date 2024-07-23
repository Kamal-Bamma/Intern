const flashMiddleware = (req, res, next) => {
  res.locals.messages = req.flash();
  if (req.session && req.session.user) {
    req.user = req.session.user;
  } else {
    req.user = null;
  }
  next();
};

module.exports = flashMiddleware;
