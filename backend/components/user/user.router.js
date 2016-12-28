/**
 * Created by jarek on 28/12/2016.
 */

import User from './user.model';

export default (app, router, passport) => {
  router.route('/users')
    .get(passport.authenticate('jwt', { session: false}), (req, res) => { //TODO handle with config of JWT
      User.find({}, 'email username')
        .then(users => {
          res.json(users);
        })
        .catch(err => {
          res.send(err);
        })
    })
}