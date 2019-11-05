module.exports = {
  // Methods take req(uest), res(ponse) & the next function if you want to use this as middleware
  notFound(req, res, next) {
    res.status(404);
    res.json({"msg": "Api endpoint not available"});
  }
}
