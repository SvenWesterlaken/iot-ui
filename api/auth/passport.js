
const passport = require('passport');
const passport_jwt = require('passport-jwt');
const env = require('../config/env');

const JwtStrategy = passport_jwt.Strategy;
const ExtractJwt = passport_jwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.secretkey
};

passport.use(new JwtStrategy(options, (payload, done) => {
  // Check if the jwt is valid by examening the payload

  // if valid
  // done(null, extra information);

  // if invalid
  // done(null, false);
}));

module.exports = passport;
