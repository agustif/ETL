import passport from 'passport'
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'agusti'
    },
    function (jwt_payload: string, done: (error: unknown, user: unknown, info?: unknown) => void) {
      if (jwt_payload) done(null, { id: jwt_payload.sub }, { message: 'hi' })
      else done('error', null)
    }
  )
)

const genToken = () => {
  return jwt.sign(
    {
      iss: 'etl',
      sub: 1,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 10000000)
    },
    'agusti'
  )
}
export { genToken }