// ```
// passport.conf.js
// (c) 2015 David Newman
// david.r.niciforovic@gmail.com
// passport.conf.js may be freely distributed under the MIT license
// ```

// *config/passport.conf.js*

// This file contains the function which configures the PassportJS
// instance passed in.

// Load PassportJS strategies
import LocalStrategy from 'passport-local';

// Load user model
import User from './../backend/components/user/user.model';
import InvalidToken from './../backend/components/authentication/inalid-token.model';
import {default as RefreshTokenModel, RemoveRefreshToken, HandleRefreshToken} from './../backend/components/authentication/refresh-token.model';
import RefreshStrategy from './refresh.strategy';
import jwt from 'jsonwebtoken';

import jwtConf from './jwt.conf';

export default (passport, passportJWT) => {
  let jwtOptions = jwtConf(passportJWT);

  let JwtStrategy = passportJWT.Strategy;

  let refreshStrategy = RefreshStrategy;

  let handleRefreshToken = HandleRefreshToken;

  let removeRefreshToken = RemoveRefreshToken;

  // Define length boundariess for expected parameters
  let bounds = {

    username: {

      minLength: 3,

      maxLength: 16
    },

    password: {

      minLength: 8,

      maxLength: 128
    },

    email: {

      minLength: 5,

      maxLength: 256
    }
  };

  // Function to check a string against a REGEX for email validity
  let validateEmail = (email) => {

    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return re.test(email);
  };

  // Helper function to validate string length
  let checkLength = (string, min, max) => {

    // If the string is outside the passed in bounds...
    if (string.length > max || string.length < min)
      return false;

    else
      return true;
  };

  // # Passport Session Setup

  // *required for persistent login sessions*

  // Passport needs the ability to serialize and deserialize users out of
  // session data

  // ## Serialize User
  passport.serializeUser((user, done) => {

    let sessionUser = {

      _id: user._id,

      username: user.username

      //role : user.role
    };

    done(null, sessionUser);
  });

  // ## Deserialize User
  passport.deserializeUser((sessionUser, done) => {

    // The sessionUser object is different from the user mongoose
    // collection

    // It is actually req.session.passport.user and comes from the
    // session collection
    done(null, sessionUser);
  });

  // # Local Signup

  // We are using named strategies since we have one for login and one
  // for signup

  // By default, if there is no name, it would just be called 'local'

  passport.use('jwt', new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    InvalidToken.find({
      token: jwt.sign(jwt_payload, jwtOptions.secretOrKey)
    }, (err, docs) => {
      if (err) {
        return done(err, false);
      }
      if (!docs.length) {
        User.findById(jwt_payload.id, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            if (new Date(user.passwordDate).getTime() > new Date(parseInt(jwt_payload.iat + '000')).getTime()) {
              done(null, false);
            }
            done(null, user);
          } else {
            done(null, false);
          }
        });
      } else {
        done(null, false);
      }
    });
  }));

  // # Local Login

  // We are using named strategies since we have one for login and one
  // for signup

  // By default, if there is no name, it would just be called 'local'

  passport.use('refresh-login', new refreshStrategy(jwtOptions, (jwt_payload, done) => {
    let refToken = jwt.sign(jwt_payload, jwtOptions.refreshSecret);

      RefreshTokenModel.find({
        token: refToken
      }, (err, docs) => {
        if (err) {
          return done(err, false);
        }

        if (!docs.length)
          return done(null, false);

        removeRefreshToken(refToken)
          .then(res => {
            User.findById(jwt_payload.id, (err, user) => {
              if (err)
                return done(err, false);

              if (!user)
                return done(null, false);

              if (new Date(user.passwordDate).getTime() > new Date(parseInt(jwt_payload.iat + '000')).getTime()) {
                return done(null, false);
              }

              handleRefreshToken(user.id, jwtOptions)
                .then(res => {
                  return done(null, res);
                })
                .catch(err => {
                  return done(null, false);
                });
            });
          })
          .catch(err => {
            return done(null, false);
          });
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    (req, username, password, done) => {
      if (!checkLength(username, bounds.username.minLength, bounds.email.maxLength)) {

        // ### Verify Callback

        // Invoke `done` with `false` to indicate authentication
        // failure
        return done(null,

          false,

          // Return info message object
          {loginMessage: 'Invalid username/email length.'}
        );
      }

      // If the length of the password string is too long/short,
      // invoke verify callback
      if (!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {

        return done(null,

          false,

          {loginMessage: 'Invalid password length.'}
        );
      }

      User.findOne({email: username.toLowerCase()}
        , (err, user) => {

          if (err)
            return done(err);

          // If no user is found, return a message
          if (!user) {

            return done(null,

              false,

              {
                loginMessage: 'That user was not found. ' +
                'Please enter valid user credentials.'
              }
            );
          }

          // If the user is found but the password is incorrect
          if (!user.validPassword(password)) {

            return done(null,

              false,

              {loginMessage: 'Invalid password entered.'});
          }

          // Otherwise all is well; return user token
          /*return done(null,
           jwt.sign({id: user.id}, jwtOptions.secretOrKey, {
           expiresIn: jwtOptions.expiresIn
           }));*/

          handleRefreshToken(user.id, jwtOptions)
            .then(res => {
              return done(null, res);
            })
            .catch(err => {
              return done(null, false);
            });
        });
    }));
};
