'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _post = require('../src/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = new _post2.default();

describe('When a new User signs up', function () {
  var result = void 0;
  var name = '';
  var username = '';
  var email = '';
  var password = '';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Name is not specified ', function (done) {
    (0, _expect2.default)(result).toEqual('Name can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', function () {
  var result = void 0;
  var name = 'Ema Ala';
  var username = '';
  var email = '';
  var password = '';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is not specified ', function (done) {
    (0, _expect2.default)(result).toEqual('Username can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', function () {
  var result = void 0;
  var name = 'Ema Ala';
  var username = 'Evidence';
  var email = '';
  var password = '';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is not specified ', function (done) {
    (0, _expect2.default)(result).toEqual('Email can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', function () {
  var result = void 0;
  var name = 'Ema Ala';
  var username = 'Evidence';
  var email = 'ema@gmail.com';
  var password = '';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Password is not specified ', function (done) {
    (0, _expect2.default)(result).toEqual('Password can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', function () {
  var result = void 0;
  var name = 'Ema Ala';
  var username = 'Evidence';
  var email = 'ema@gmail.com';
  var password = '123456789';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is already used', function (done) {
    (0, _expect2.default)(result).toEqual('username must be unique');
    done();
  }, 10000);
});

describe('When a new User signs up', function () {
  var result = void 0;
  var name = 'Ema Ala';
  var username = 'Oliver';
  var email = 'ema@gmail.com';
  var password = '123456789';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is already used', function (done) {
    (0, _expect2.default)(result).toEqual('email must be unique');
    done();
  }, 10000);
});

xdescribe('When a new User signs up', function () {
  var result = void 0;
  var name = 'Ema Ala';
  var username = 'Bilasi';
  var email = 'bilasi@gmail.com';
  var password = '123456789';
  beforeEach(function (done) {
    user.signUp(name, username, email, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object of the User if the details are correct', function (done) {
    (0, _expect2.default)(_typeof(result.dataValues)).toEqual('object');
    done();
  }, 10000);
});

describe('When a register User signs in', function () {
  var result = void 0;
  var username = '';
  var password = '123456789';
  beforeEach(function (done) {
    user.logIn(username, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is not stated', function (done) {
    (0, _expect2.default)(result).toEqual('Username can not be empty');
    done();
  }, 10000);
});

describe('When a register User signs in', function () {
  var result = void 0;
  var username = 'Evidence';
  var password = '';
  beforeEach(function (done) {
    user.logIn(username, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if password is not stated', function (done) {
    (0, _expect2.default)(result).toEqual('Password can not be empty');
    done();
  }, 10000);
});

describe('When an unregister User signs in', function () {
  var result = void 0;
  var username = 'Ibukun';
  var password = '123456789';
  beforeEach(function (done) {
    user.logIn(username, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is not registered', function (done) {
    (0, _expect2.default)(result).toEqual('Failed, Username not Found');
    done();
  }, 10000);
});

describe('When a register User signs in', function () {
  var result = void 0;
  var username = 'Evidence';
  var password = '12345678900';
  beforeEach(function (done) {
    user.logIn(username, password, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is stated but password is not correct', function (done) {
    (0, _expect2.default)(result).toEqual('Failed, Wrong Password');
    done();
  }, 10000);
});

describe('When a register User signs in', function () {
  var result = void 0;
  var username = 'Evidence';
  var password = '1234567890';
  beforeEach(function (done) {
    user.logIn(username, password, function (response) {
      result = response[0];
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object if username and password are correct', function (done) {
    (0, _expect2.default)(_typeof(result.dataValues)).toEqual('object');
    done();
  }, 10000);
});

describe('When a User creates a group', function () {
  var result = void 0;
  var groupName = '';
  var creator = '1234567890';
  beforeEach(function (done) {
    user.createGroup(groupName, creator, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if Group name is not defined', function (done) {
    (0, _expect2.default)(result).toEqual('Group Name can not be Empty');
    done();
  }, 10000);
});

describe('When a User creates a group', function () {
  var result = void 0;
  var groupName = 'Evidence';
  var creator = '';
  beforeEach(function (done) {
    user.createGroup(groupName, creator, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if creator id is not defined', function (done) {
    (0, _expect2.default)(result).toEqual('creator id can not be Empty');
    done();
  }, 10000);
});

describe('When a User creates a group', function () {
  var result = void 0;
  var groupName = 'Friend';
  var creator = '1';
  beforeEach(function (done) {
    user.createGroup(groupName, creator, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if the User has created a group with same name', function (done) {
    (0, _expect2.default)(result).toEqual('Group Exists already');
    done();
  }, 10000);
});

xdescribe('When a User creates a group', function () {
  var result = void 0;
  var groupName = 'Cohort1';
  var creator = '1';
  beforeEach(function (done) {
    user.createGroup(groupName, creator, function (response) {
      result = response[0].dataValues;
      done();
    }, 10000);
  }, 10000);
  it('should create group if it does not exist', function (done) {
    (0, _expect2.default)(typeof result === 'undefined' ? 'undefined' : _typeof(result)).toEqual('object');
    done();
  }, 10000);
});

describe('When a User creates a group', function () {
  var result = void 0;
  var groupName = 'Evidence';
  var creator = '123';
  beforeEach(function (done) {
    user.createGroup(groupName, creator, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if an unregistered User tries to create a group', function (done) {
    (0, _expect2.default)(result).toEqual('SequelizeForeignKeyConstraintError');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', function () {
  var result = void 0;
  var group = '';
  var userId = '123';
  var adding = 1;
  beforeEach(function (done) {
    user.addUsers(group, userId, adding, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if group Id is not stated', function (done) {
    (0, _expect2.default)(result).toEqual('Group Id must be stated');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', function () {
  var result = void 0;
  var group = '1';
  var userId = '';
  var adding = 1;
  beforeEach(function (done) {
    user.addUsers(group, userId, adding, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User Id is not stated', function (done) {
    (0, _expect2.default)(result).toEqual('User Id must be stated');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', function () {
  var result = void 0;
  var group = '1';
  var userId = '2';
  var adding = 1;
  beforeEach(function (done) {
    user.addUsers(group, userId, adding, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User is already a member of the group', function (done) {
    (0, _expect2.default)(result).toEqual('User is already a member');
    done();
  }, 10000);
});

xdescribe('When a User adds another user to a group', function () {
  var result = void 0;
  var group = '12';
  var userId = '2';
  var adding = 1;
  beforeEach(function (done) {
    user.addUsers(group, userId, adding, function (response) {
      result = response[0].dataValues;
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object if User is not a member yet', function (done) {
    (0, _expect2.default)(typeof result === 'undefined' ? 'undefined' : _typeof(result)).toEqual('object');
    done();
  }, 10000);
});

describe('When a User posts message to a group', function () {
  var result = void 0;
  var to = '';
  var from = '1';
  var text = '';
  var priorityLevel = '';
  beforeEach(function (done) {
    user.postMessage(to, from, text, priorityLevel, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Group is not specified', function (done) {
    (0, _expect2.default)(result).toEqual('Group must be specified');
    done();
  }, 10000);
});

describe('When a User posts message to a group', function () {
  var result = void 0;
  var to = '1';
  var from = '';
  var text = '';
  var priorityLevel = '';
  beforeEach(function (done) {
    user.postMessage(to, from, text, priorityLevel, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Sender is not specified', function (done) {
    (0, _expect2.default)(result).toEqual('Sender must be specified');
    done();
  }, 10000);
});

describe('When a User posts message to a group', function () {
  var result = void 0;
  var to = '1';
  var from = '1';
  var text = '';
  var priorityLevel = '';
  beforeEach(function (done) {
    user.postMessage(to, from, text, priorityLevel, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Message is not specified', function (done) {
    (0, _expect2.default)(result).toEqual('message cannot be null');
    done();
  }, 10000);
});

describe('When a User posts message to a group', function () {
  var result = void 0;
  var to = '1';
  var from = '1';
  var text = 'We are expecting you';
  var priorityLevel = '';
  beforeEach(function (done) {
    user.postMessage(to, from, text, priorityLevel, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Priority is not specified', function (done) {
    (0, _expect2.default)(result).toEqual('priority cannot be null');
    done();
  }, 10000);
});

xdescribe('When a User posts message to a group', function () {
  var result = void 0;
  var to = '1';
  var from = '1';
  var text = 'We are expecting you';
  var priorityLevel = '1';
  beforeEach(function (done) {
    user.postMessage(to, from, text, priorityLevel, function (response) {
      result = response[0].dataValues;
      done();
    }, 30000);
  }, 30000);
  it('should return a JSON oject if all details are specified', function (done) {
    (0, _expect2.default)(result).toEqual('object');
    done();
  }, 30000);
});

describe('When a User requests for message posted to a group', function () {
  var result = void 0;
  var group = '10';
  beforeEach(function (done) {
    user.retrieveMessage(group, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Empty array if no exist Message for the group', function (done) {
    (0, _expect2.default)(result.length).toEqual(0);
    done();
  }, 10000);
});

describe('When a User requests for message posted to a group', function () {
  var result = void 0;
  var group = '1';
  beforeEach(function (done) {
    user.retrieveMessage(group, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a nonEmpty array if there are Message(s) for the group', function (done) {
    (0, _expect2.default)(result.length).toBeGreaterThan(0);
    done();
  }, 10000);
});

describe('When a User requests for message posted to a group', function () {
  var result = void 0;
  var group = 'Ema';
  beforeEach(function (done) {
    user.retrieveMessage(group, function (response) {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a nonEmpty array if there are Message(s) for the group', function (done) {
    (0, _expect2.default)(result.name).toEqual('SequelizeDatabaseError');
    done();
  }, 10000);
});