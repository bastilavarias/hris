const {secretOrKey} = require("../configuration");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => passport.use(new JwtStrategy(opts, (jwt_payload, done) => done(null, jwt_payload)));
