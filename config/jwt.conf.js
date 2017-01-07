/**
 * Created by jarek on 08/11/2016.
 */

export default (passportJWT) => {
  return {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME_MINS * 60, //seconds
    refreshExpiresIn: process.env.REFRESH_TOKEN_LIFETIME_DAYS * 86400 //seconds
    //expiresIn: 86400 //seconds
  }
}

