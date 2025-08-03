const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware to parse form data (urlencoded)
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', indexRouter);

// catch 404
app.use(function (req, res, next) {
  res.status(404).render('layout', {
    title: 'Not Found',
    body: '<h1>404 - Not Found</h1>',
  });
});

// error handler (simple for dev)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('layout', {
    title: 'Error',
    body: `<h1>${err.message}</h1><pre>${err.stack}</pre>`,
  });
});

module.exports = app;
