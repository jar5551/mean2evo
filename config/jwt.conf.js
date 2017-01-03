/**
 * Created by jarek on 08/11/2016.
 */

export default (passportJWT) => {
  return {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
    secretOrKey: '6a4f243f91f461dc1c691a61aedbb0abff02a4f4',
    refreshSecret: 'd32f506252e2fe83367379532bd1b5af396cff6c',
    expiresIn: 20, //seconds
    refreshExpiresIn: 14 //days
    //expiresIn: 86400 //seconds
  }
}

