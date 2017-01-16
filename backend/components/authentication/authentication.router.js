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
      // sessione
      req.login(user, (err) => {

        if (err)
          return next(err);


        // Set HTTP status code `200 OK`
        res.status(200);

        res.json({
          message: "ok",
          token: user.token,
          refresh: user.refresh
        });
      });

    })(req, res, next);
  });

  router.get('/auth/logout', passport.authenticate('jwt', {session: false}), tokenExtract, (req, res) => {
    InvalidToken.create({
      token: req.jwt,
      expiresAt: parseInt(req.jwtDecode.exp + '000')
    }, (err, message) => {
      if (err)
        res.send(err);

      //res.sendStatus(401);
      res.json(message);
    });
  });

  router.get('/auth/me', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    console.log(req);

    res.json(req.user);

    /*User.findById(id, 'username email', (err, user) => {
      if (err)
        res.send(err);
      else {
        res.json({'user': user});
      }
    });*/
  });

  router.post('/auth/refresh', (req, res, next) => {
    passport.authenticate('refresh-login', (err, token, info) => {

      if (err)
        return next(err);

      console.log('/auth/refresh', token);

      if (!token) {
        res.status(401);
        return next(info);
      }

      res.json({
        message: "ok",
        token: token.token,
        refresh: token.refresh
      });
    })(req, res, next);
  });

}