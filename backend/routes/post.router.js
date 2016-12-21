/**
 * Created by jarek on 19/12/2016.
 */

import Post from './../models/post.model';

export default (app, router) => {
  router.route('/posts')
    .get((req, res) => {
      Post.find((err, posts) => {
        if (err)
          res.send(err);

        else
          res.json(posts);
      });
    })

    .post((req, res) => {
      let posts = [];

      for (var i = 0; i < 20; i++) {
        posts.push({
          title: 'Post ' + i,
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et erat elementum, fermentum diam in, blandit est. Pellentesque viverra, urna ut tempus blandit, neque felis sagittis massa, eget dignissim dolor leo at metus.'
        })
      }

      posts.forEach(function (element) {
        Post.create({
          title: element.title,
          content: element.content
        }, (err, todo) => {
          if (err)
            res.send(err);

          console.log(`Todo created: ${todo}`);
        });
      });
    });
}