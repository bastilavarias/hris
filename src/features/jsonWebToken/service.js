require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET_OR_KEY;

const jsonWebTokenService = {
  init: (passport) =>
    passport.use(
      new JwtStrategy(opts, (jwtPayload, done) => {
        return done(null, jwtPayload);
      })
    ),

  getBearerToken: (payload) => {
    const signedJWT = jwt.sign(
      JSON.parse(JSON.stringify(payload)),
      process.env.auth_secret_or_key
    );
    return `Bearer ${signedJWT}`;
  },
};

module.exports = jsonWebTokenService;
