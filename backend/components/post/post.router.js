/**
 * Created by jarek on 19/12/2016.
 */

import Post from './post.model';

export default (app, router) => {
  router.route('/posts')
    .get((req, res) => {
      //res.status(404).send('aaa'); //for testing purposes only

      Post.find()
        .then(posts => {
          res.json(posts);
        })
        .catch(err => {
          res.send(err);
        })
    })

    .post((req, res) => {
      let posts = [];

      for (var i = 0; i < 20; i++) {
        posts.push({
          title: 'Post ' + i,
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et erat elementum, fermentum diam in, blandit est. Pellentesque viverra, urna ut tempus blandit, neque felis sagittis massa, eget dignissim dolor leo at metus.'
        })
      }

      Post.create(posts)
        .then(posts => {
          console.log('created', posts);
          return res.send(posts);
        })
        .catch(err => {
          return res.send(err);
        });
    });
}