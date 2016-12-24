/**
 * Created by jarek on 24/12/2016.
 */
import User from './../user/user.model'
import tokenExtract from './authentication.middleware';

export default (app, router, passport) => {
  router.post('/auth/signin', (req, res, next) => {
    console.log('signin');
    res.json({
      token: 123
    })
  });

}