/**
 * Created by jarek on 24/12/2016.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

let userSchema = mongoose.Schema({

  username: {type: String, required: true},

  password: {type: String, required: true},

  passwordDate: {type: Date, default: Date.now},

  email: {type: String, required: true, index: {unique: true}}

});

userSchema.pre('save', function (next) {

  let user = this;

  user.password = user.generateHash(user.password);

  next();
});

// ## Methods

// ### Generate a hash
userSchema.methods.generateHash = function (password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// ### Check if password is valid
userSchema.methods.validPassword = function (password) {

  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
