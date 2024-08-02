const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { isAuthenticated };
