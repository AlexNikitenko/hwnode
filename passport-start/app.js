// var createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var sassMiddleware = require('node-sass-middleware');

// var indexRouter = require('./routes/index');

const app = express();
const port = 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new FileStore(),
    secret: 'ds23$%sdww3f',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUnitialized: false,
  })
);

require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());

//  **ROUTERS **

app.get('/', (req, res) => {
  console.log('route / req session >>>', req.session);
  res.send('base page');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('incorrect email or password');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
});


const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

app.get('/admin', auth, (req, res) => {
  res.send('admin page');
});

app.post('/logout', auth, (req, res) => {
  req.logOut();
  res.redirect('/');
});

// ** END OF ROUTERS **

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use(cookieParser());
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
