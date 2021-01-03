const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).send({ message: 'Must be authenticated to access this resource' });
};

module.exports = {
  ensureAuthenticated
}