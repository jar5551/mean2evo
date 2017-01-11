/**
 * Created by jarek on 19/12/2016.
 */

import Post from './post.model';

export default (app, router, passport) => {
  router.route('/posts')
    .get((req, res) => {
      //res.status(404).send('aaa'); //for testing purposes only

      Post.find({
        isPublic: true
      })
        .then(posts => {
          res.json(posts);
        })
        .catch(err => {
          res.send(err);
        })
    });

  router.route('/posts/all')
    .get(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.find()
        .then(posts => {
          res.json(posts);
        })
        .catch(err => {
          res.send(err);
        })
    })

    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.create(req.body)
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
      Post.findById(req.params.id)
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.send(err);
        })
    })
    .put(passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          post.title = req.body.title;
          post.content = req.body.content;
          post.isPublic = req.body.isPublic;

          post.save()
            .then(res => {
              res.json(res);
            })
            .catch(err => {
              res.send(err);
            })

        })
    });
}