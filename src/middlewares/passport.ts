const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'agusti'
    }, function(jwt_payload: string, done: (arg0: null, arg1: { id: any; }) => void) {
    //this should be a database call
    done(null, {id: jwt_payload.sub})
}));