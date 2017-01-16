/**
 * Created by jarek on 24/12/2016.
 */

module.exports = function tokenExtract(req, res, next) {
  let token = req.headers.authorization.split(' ')[1];
  req.jwt = token;
  next();
};