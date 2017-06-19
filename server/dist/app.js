'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = new _post2.default();
var Router = _express2.default.Router();
Router.use(_bodyParser2.default.json());
Router.use(_bodyParser2.default.urlencoded({ extended: true }));
Router.use((0, _expressValidator2.default)());
var sess = void 0;

/**
 * result - description
 *
 * @param  {type} typeof result !== 'object' description
 * @return {type}                            description
 */
Router.post('/api/user/signup', function (req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  user.signUp(name, username, email, password, function (result) {
    console.log(result);
    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object') {
      res.send(result);
    } else {
      sess = req.session;
      sess.UserId = result.id;
      sess.userName = result.username;
      res.send(result);
    }
  });
});

Router.post('/api/user/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username === undefined || username === '') {
    res.send('Username can not be empty');
  } else if (password === undefined || password === '') {
    res.send('Password can not be empty');
  } else {
    user.logIn(username, password, function (result) {
      sess = req.session;
      sess.UserId = result[0].id;
      sess.userName = result[0].username;
      res.send(result);
    });
  }
});

Router.post('/api/group', function (req, res) {
  sess = req.session;
  var gpName = req.body.gpname;
  var userId = sess.UserId;
  console.log(userId);
  user.createGroup(gpName, userId, function (result) {
    console.log(result);
    res.send(result);
  });
});

Router.post('/api/group/:groupid/user', function (req, res) {
  var groupId = req.params.groupid;
  var userId = req.body.user;
  console.log(userId);
  user.addUsers(groupId, userId, 1, function (result) {
    console.log(result);
    res.send(result);
  });
});

Router.post('/api/group/:groupid/message', function (req, res) {
  sess = req.session;
  var groupId = req.params.groupid;
  var message = req.body.message;
  var priority = req.body.priority;
  var from = sess.UserId ? sess.UserId : req.body.from;
  console.log(req.params.groupid);
  user.postMessage(groupId, from, message, priority, function (result) {
    console.log(result);
    res.send(result);
  });
});

Router.get('/api/group/:groupid/messages', function (req, res) {
  var groupId = req.params.groupid;
  console.log(parseInt(groupId, 10));
  user.retrieveMessage(groupId, function (result) {
    console.log(result);
    res.send(result);
  });
});

exports.default = Router;