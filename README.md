# Mongo + ExpressJS (ES6) + Angular4 (TS) + Node - Starter Pack

This is MEA2N starter pack with Angular4 with angular-cli on front and ExpressJS in ES6 on back. Features socket.io integration, Mongo with Mongoose, Material Desing and tests (WIP). Passport and JWT authentication is implemented (with support of refresh tokens).

## How to install and requirments
Firstly you have to clone this repo.
Then install all dependencies with `npm install`. You will also need to install angular cli  `npm install -g angular-cli`. To run backend devlopment server you have to install gulp `npm install --global gulp-cli`

## Development server
Run `npm start` for a dev frontentd server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Run `gulp` for a development backend server. 

## Angular 2 code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
