const config = require('./env');

module.exports = {

  protectionHeaders(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', config.allowOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  },

  preflightHandler(req, res, next) {
    'OPTIONS' == req.method ? res.sendStatus(204) : next();
  },

  errorHandler(err, req, res, next) {
    res.status(err.status || 422).send({
      name: err.name,
      code: err.code,
      message: err.message
    });
  }
}
