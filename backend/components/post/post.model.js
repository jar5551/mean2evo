/**
 * Created by jarek on 19/12/2016.
 */
import mongoose from 'mongoose';

let postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type : String }
});

postSchema.methods = {
  list: function () {
    return this.find()
      .exec();
  }
};

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Post', postSchema);