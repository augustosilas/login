const { authSecret } = require("../../.env");
const passport = require("passport");
const passportJwr = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwr;

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
};
