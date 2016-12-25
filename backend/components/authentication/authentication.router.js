/**
 * Created by jarek on 24/12/2016.
 */
import User from './../user/user.model'
import tokenExtract from './authentication.middleware';
import InvalidToken from './inalid-token.model';

export default (app, router, passport) => {
  router.post('/auth/signin', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.loginMessage);
      }

      // Use login function exposed by Passport to establish a login
      // session
      req.login(user, (err) => {

        if (err)
          return next(err);


        // Set HTTP status code `200 OK`
        res.status(200);

        res.json({message: "ok", token: user});
      });

    })(req, res, next);
  });

  /*router.get('/auth/me', passport.authenticate('jwt', {session: false}), tokenExtract, (req, res, next) => {
    let id = req.jwtDecode.id;

    User.findById(id, 'username email', (err, user) => {
      if (err)
        res.send(err);
      else {
        res.json({'user': user});
      }

    });
  });*/

}