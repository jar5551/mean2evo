/**
 * Created by jarek on 24/12/2016.
 */
import jwt from 'jsonwebtoken';

module.exports = function tokenExtract(req, res, next) {
  let token = req.headers.authorization.split(' ')[1];
  req.jwtDecode = jwt.decode(token);
  req.jwt = token;
  next();
};