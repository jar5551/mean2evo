/**
 * Created by jarek on 03/01/2017.
 */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

let refreshTokenSchema = new mongoose.Schema({
  token: {type: String},
  expiresAt: {type: Date, default: Date.now, expires: 0}
});

let RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshTokenModel;

export function RemoveRefreshToken(token) {
  return new Promise((resolve, reject) => {
    RefreshTokenModel.find({token: token}).remove(
      err => {
        if (err)
          return reject(err);

        return resolve(true);
      }
    );
  });
}

export function HandleRefreshToken(userId, jwtOptions) {
  return new Promise((resolve, reject) => {
    let tokens = {
      token: jwt.sign({id: userId}, jwtOptions.secretOrKey, {
        expiresIn: jwtOptions.expiresIn
      }),
      refresh: jwt.sign({id: userId}, jwtOptions.refreshSecret, {
        expiresIn: jwtOptions.refreshExpiresIn
      })
    };

    RefreshTokenModel.create({
      token: tokens.refresh,
      expiresAt: parseInt(jwt.decode(tokens.refresh).exp + '000')
    }, (err, res) => {
      if (err)
        return reject(err);

      return resolve(tokens);
    });
  });
}