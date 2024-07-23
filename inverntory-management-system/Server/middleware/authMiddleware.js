const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.roles === "admin") {
    return res.redirect("/items");
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
