var jwt = require ('jsonwebtoken');
var env = require('../config/env');

module.exports = {

  encodeToken(user) {
    return new Promise((resolve, reject) => {
      jwt.sign({ sub: user._id }, env.secretkey, (err, token) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(token);
        }
      });
    });
  }
}
