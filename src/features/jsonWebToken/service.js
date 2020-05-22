require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET_OR_KEY;

const jsonWebTokenService = {
  init: (passport) =>
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => done(null, jwt_payload))
    ),
};

module.exports = jsonWebTokenService;
