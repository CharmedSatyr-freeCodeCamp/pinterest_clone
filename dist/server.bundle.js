/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Pin = new Schema({
  created: {
    type: Date,
    required: true,
    default: new Date(),
    expires: '365d'
  },
  img: {
    type: String,
    default: '../../client/img/image.png' //This is redundant from default client state
  },
  likes: [String],
  shares: [String],
  title: { type: String, required: true },
  owner: { type: String, required: true }
});

exports.default = _mongoose2.default.model('Pin', Pin);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ES6+ ***/

__webpack_require__(2);

var _es6Promise = __webpack_require__(6);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

__webpack_require__(7);

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = __webpack_require__(9);

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = __webpack_require__(10);

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = __webpack_require__(11);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = __webpack_require__(12);

var _passport2 = _interopRequireDefault(_passport);

var _connectMongo = __webpack_require__(13);

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _bodyParser = __webpack_require__(14);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = __webpack_require__(15);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _indexServer = __webpack_require__(16);

var _authConfig = __webpack_require__(18);

var _http = __webpack_require__(22);

var _http2 = _interopRequireDefault(_http);

var _socket = __webpack_require__(23);

var _socket2 = _interopRequireDefault(_socket);

var _socketServer = __webpack_require__(24);

var _socketServer2 = _interopRequireDefault(_socketServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6Promise2.default.polyfill();

/*** EXPRESS ***/

var app = (0, _express2.default)();

/*** ENVIRONMENT ***/
var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';
var PROD = "development" === 'production';

DEV ? app.use((0, _morgan2.default)('dev')) : app.use((0, _morgan2.default)('tiny'));
console.log('DEV?', DEV);

/*** ENABLE COMPRESSION ***/

if (PROD) {
  app.use((0, _compression2.default)());
}

/*** MIDDLEWARE ***/
app.use('/js', _express2.default.static(path + '/dist/js')); //The first argument creates the virtual directory used in index.html
app.use('/styles', _express2.default.static(path + '/dist/styles'));
app.use('/img', _express2.default.static(path + '/dist/img'));
app.use('/fonts', _express2.default.static(path + '/dist/fonts'));

/*** MONGOOSE ***/

var db = _mongoose2.default.connection;
_mongoose2.default.Promise = _es6Promise2.default;
_mongoose2.default.connect(process.env.MONGO_URI, { useMongoClient: true }, function (err, db) {
  if (err) {
    console.error('Failed to connect to database!');
  } else {
    console.log('Connected to database.');
  }
});

/*** AUTHENTICATION ***/

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

var sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 1800000 //30 minutes
  },
  store: new MongoStore({ mongooseConnection: db }, function (err) {
    console.error(err);
  }), //defaults to MemoryStore instance, which can cause memory leaks
  name: 'id'
};

if (PROD) {
  app.set('trust proxy', 1);
  sess.cookie.secure = true; //serve secure cookies in production
  sess.cookie.httpOnly = true;
}

app.use((0, _expressSession2.default)(sess));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

/*** ROUTES ***/

(0, _authConfig.authConfig)(_passport2.default);
(0, _indexServer.routes)(app, _passport2.default);

/*** WEB SOCKETS ***/

var server = _http2.default.createServer(app);

var io = (0, _socket2.default)(server);

(0, _socketServer2.default)(io);

/*** SERVE ***/
var port = process.env.PORT;
server.listen(port, function () {
  console.log('Server is listening on port ' + port + '.');
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ENVIRONMENT ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pinControllerServer = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';

/*** CONTROLLERS ***/


/*** ROUTES ***/
var routes = exports.routes = function routes(app, passport) {
  var name_view = void 0; //This is the name that will display in the client view

  //Authorization check
  var permissions = function permissions(req, res, next) {
    if (req.isAuthenticated()) {
      if (DEV) {
        console.log('AUTHORIZATION SUCCESSFUL');
      }
      if (req.user.github.username) {
        name_view = req.user.github.username;
      } else if (req.user.twitter.username) {
        name_view = req.user.twitter.username;
      }
      console.log('USER:', name_view);
      return next();
    } else {
      if (DEV) {
        console.log('USER NOT AUTHORIZED');
      }
      res.redirect('/login');
    }
  };

  /*
  //Allows session's name_view to be accessed by controllers
  app.use((req, res, next) => {
    res.locals.name_view = name_view
    next()
  })
  */

  //Root view
  app.route('/').get(permissions, function (req, res) {
    res.sendFile(path + '/dist/index.html');
  });

  //Login view
  app.route('/login').get(function (req, res) {
    res.sendFile(path + '/dist/login.html');
  });

  //GitHub and Passport.js authentication - URL
  app.route('/auth/github').get(passport.authenticate('github'));

  //GitHub and Passport.js authentication - callback
  app.route('/auth/github/callback').get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  //Twitter Auth
  app.route('/auth/twitter').get(passport.authenticate('twitter'));

  //Twitter Auth
  app.route('/auth/twitter/callback').get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  //Client-side API path to GET name_view
  //Unclear why this won't work with a permissions check
  app.route('/api/users/logged').get(
  /*permissions,*/function (req, res) {
    if (DEV) {
      console.log('Client requesting username...');
    }
    if (name_view) {
      res.json(name_view);
    } else {
      console.log('name_view ERROR');
      res.json('Stranger');
    }
  });

  //Passport logout
  app.route('/logout').get(function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  //Save new pin
  //Unclear why this won't work with a permissions check
  app.route('/api/savePin/:data').post( /*permissions,*/_pinControllerServer.savePin);

  //Delete pin
  //Unclear why this won't work with a permissions check
  app.route('/api/deletePin/:data').delete( /*permissions,*/_pinControllerServer.deletePin);

  //All pins
  app.route('/api/allPins').get(_pinControllerServer.allPins);

  //Like or unlike a pin
  //Unclear why this won't work with a permissions check
  app.route('/api/toggleLikePin/:data').post( /*permissions,*/_pinControllerServer.toggleLikePin);

  /*** DEBUGGING - No UI ***/
  //Delete all pins
  app.use('/api/unpinAll', _pinControllerServer.unpinAll);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ENVIRONMENT ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePin = exports.savePin = exports.unpinAll = exports.allPins = exports.toggleLikePin = undefined;

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _Pin = __webpack_require__(3);

var _Pin2 = _interopRequireDefault(_Pin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';

/*** MODEL ***/


/*** FUNCTIONS ***/
//Toggle Like Pin
var toggleLikePin = exports.toggleLikePin = function toggleLikePin(req, res) {
  var obj = JSON.parse(decodeURIComponent(req.params.data));
  var title = obj.title;
  var img = obj.img;
  var owner = obj.owner;
  var user = obj.loggedUser;

  _Pin2.default.findOne({
    title: title,
    img: img,
    owner: owner
  }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      //If the user already liked the pin
      if (doc.likes.indexOf(user) >= 0) {
        //Remove the like
        doc.likes.splice(doc.likes.indexOf(user), 1);
        if (DEV) {
          console.log('This pin has been unliked!');
        }
      } else {
        //Otherwise add it
        doc.likes.push(user);
        if (DEV) {
          console.log('This pin has been liked!');
        }
      }
      //Save what happened
      doc.save(function (err, result) {
        res.json('Saved' + result);
      });
    }
  });
};

//Get all pins
var allPins = exports.allPins = function allPins(req, res) {
  _Pin2.default.find({}, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json(doc);
    }
  });
};

//Delete all pins
var unpinAll = exports.unpinAll = function unpinAll(req, res) {
  _Pin2.default.remove({}, function (err, doc) {
    res.json('All pins deleted.');
  });
};

//Save new Pin
var savePin = exports.savePin = function savePin(req, res) {
  var obj = JSON.parse(decodeURIComponent(req.params.data));
  var title = obj.title;
  var img = obj.img;
  var owner = obj.owner;
  _Pin2.default.findOne({
    title: title,
    img: img,
    owner: owner
  }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json('You already pinned this!');
    } else {
      var newPin = new _Pin2.default({
        title: title,
        img: img,
        owner: owner
      });
      newPin.save(function (err, doc) {
        if (err) {
          console.error(err);
        }
        res.json('Your pin has been saved!');
      });
    }
  });
};

//Delete Pin
var deletePin = exports.deletePin = function deletePin(req, res) {
  var obj = JSON.parse(decodeURIComponent(req.params.data));
  var title = obj.title;
  var img = obj.img;
  var owner = obj.owner;

  _Pin2.default.remove({
    title: title,
    img: img,
    owner: owner
  }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json('Your pin has been deleted.');
    }
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authConfig = undefined;

var _User = __webpack_require__(19);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitHubStrategy = __webpack_require__(20).Strategy;
var TwitterStrategy = __webpack_require__(21).Strategy;
var authConfig = exports.authConfig = function authConfig(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    _User2.default.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.APP_URL + 'auth/twitter/callback/'
  }, function (token, tokenSecret, profile, cb) {
    process.nextTick(function () {
      _User2.default.findOne({
        'twitter.id': profile.id
      }, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (user) {
          return cb(null, user);
        } else {
          var newUser = new _User2.default();

          newUser.twitter.id = profile.id;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;

          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return cb(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.APP_URL + 'auth/github/callback/'
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      _User2.default.findOne({
        'github.id': profile.id
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new _User2.default();

          newUser.github.id = profile.id;
          newUser.github.username = profile.username;
          newUser.github.displayName = profile.displayName;

          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = __webpack_require__(1);
var Schema = mongoose.Schema;

var User = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    created: {
      type: Date,
      required: true,
      default: new Date(),
      expires: '365d'
    }
  },
  twitter: {
    id: String,
    displayName: String,
    username: String,
    created: {
      type: Date,
      required: true,
      default: new Date(),
      expires: '365d'
    }
  }
});

exports.default = mongoose.model('User', User);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-github2");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("passport-twitter");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ENVIRONMENT ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _Pin = __webpack_require__(3);

var _Pin2 = _interopRequireDefault(_Pin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';

/*** MODEL ***/


/*** Web Socket Events ***/
var ioEvents = function ioEvents(io) {
  io.on('connection', function (serverSocket) {
    if (DEV) {
      console.log('Web Sockets connected.');
    }
    //Callback 1
    serverSocket.emit('start', 'Regular communications received...');

    //Callback 2
    serverSocket.on('start', function (received) {
      setInterval(function () {
        _Pin2.default.find({}, function (err, doc) {
          if (err) {
            console.error(err);
          }
          if (doc) {
            serverSocket.emit('updateAllPins', doc);
          }
        });
      }, received);
    });

    io.on('disconnect', function () {
      console.log('Web Sockets disconnected.');
    });
  });
};

exports.default = ioEvents;

/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map