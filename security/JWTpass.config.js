const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require("../models/Associator.model");
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

module.exports = passport.authenticate("jwt", { session: false });
