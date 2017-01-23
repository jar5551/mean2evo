/**
 * Created by jarek on 19/12/2016.
 */
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  isPublic: {type: Boolean, default: false},
  author: {type: mongoose.Schema.ObjectId, ref: 'User'},
  createdDate: {type: Date, default: Date.now},
  modifiedUser: {type: mongoose.Schema.ObjectId, ref: 'User'},
  modifiedDate: {Type: Date},
  trash: {type: Boolean, default: false},
  trashDate: {type: Date},
  trashUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

postSchema.statics.getPublicPosts = function() {
  return this.find({isPublic: true, trash: false}).populate('author', 'username');
};

postSchema.statics.getAllPosts = function () {
  return this.find({trash: false}).select('title');
};

postSchema.statics.getPost = function (id) {
  return this.findById(id).populate('author', 'username');
};

postSchema.statics.createPost = function (data, userId) {
  data.author = userId;
  return this.create(data);
};

postSchema.statics.trashPost = function (id, userId) {
  return this.findById(id).populate('author', 'username');
};

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Post', postSchema);