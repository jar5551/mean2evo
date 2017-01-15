/**
 * Created by jarek on 19/12/2016.
 */
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  isPublic: {type: Boolean, default: false},
  author: {type: mongoose.Schema.ObjectId}
});

postSchema.statics.getPublicPosts = function() {
  return this.find({isPublic: true});
};

postSchema.statics.getAllPosts = function () {
  return this.find();
};

postSchema.statics.getPost = function (id) {
  return this.findById(id);
};

postSchema.statics.createPost = function (data) {
  return this.create(data);
};

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Post', postSchema);