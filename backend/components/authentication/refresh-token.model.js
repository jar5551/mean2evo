/**
 * Created by jarek on 03/01/2017.
 */
import mongoose from 'mongoose';

let refreshTokenSchema = new mongoose.Schema({
  token: {type: String},
  expiresAt: {type: Date, default: Date.now, expires: 0}
});

export default mongoose.model('RefreshToken', refreshTokenSchema);