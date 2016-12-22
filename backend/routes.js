import postRoutes from './components/post/post.router';

export default (app, router, passport, jwt) => {
  // ### Express Middlware to use for all requests
  router.use((req, res, next) => {

    console.log('I sense a disturbance in the force...'); // DEBUG

    // Make sure we go to the next routes and don't stop here...
    next();
  });

  postRoutes(app, router);

  app.use('/api', router);

  app.get('*', (req, res) => {
    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    res.sendFile('/dist/index.html', {root: __dirname + "/../"});
  });
};