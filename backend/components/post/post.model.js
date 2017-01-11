/**
 * Created by jarek on 19/12/2016.
 */
import mongoose from 'mongoose';

let postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  isPublic: {type: Boolean, default: false},
  author: {type: mongoose.Schema.ObjectId}
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Post', postSchema);