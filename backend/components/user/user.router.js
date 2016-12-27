/**
 * Created by jarek on 28/12/2016.
 */

import User from './user.model';
import jwt from 'express-jwt';

export default (app, router) => {
  router.route('/users')
    .get(jwt({secret: '6a4f243f91f461dc1c691a61aedbb0abff02a4f4'}), (req, res) => { //TODO handle with config of JWT
      User.find({}, 'email username')
        .then(users => {
          res.json(users);
        })
        .catch(err => {
          res.send(err);
        })
    })
}