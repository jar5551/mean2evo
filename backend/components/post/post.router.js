/**
 * Created by jarek on 19/12/2016.
 */

import Post from './post.model';

export default (app, router, passport) => {
  router.route('/posts')
    .get((req, res) => {
      Post.getPublicPosts()
        .then(posts => {
          res.json(posts);
        })
        .catch(err => {
          res.send(err);
        });
    });

  router.route('/posts/all')
    .get(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.getAllPosts()
        .then(posts => {
          res.json(posts);
        })
        .catch(err => {
          res.send(err);
        })
    })

    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.createPost(req.body)
        .then(posts => {
          console.log('created', posts);
          res.send(posts);
        })
        .catch(err => {
          res.send(err);
        });
    });

  router.route('/posts/:id')
    .get(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.getPost(req.params.id)
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.send(err);
        })
    })
    .put(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.getPost(req.params.id)
        .then(post => {
          post.title = req.body.title;
          post.content = req.body.content;
          post.isPublic = req.body.isPublic;

          try {
            post.save();
            res.json(post);
          } catch(e) {
            res.send(e);

          }
        })
    });
}