import expect from 'expect';
import supertest from 'supertest';
import session from 'supertest-session';
import User from '../src/user';
import app from '../server';

const user = new User();
const api = new supertest(app);
const testSession = session(app);

describe('When a new User signs up', () => {
  let result;
  const name = '';
  const username = '';
  const email = '';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Name is not specified ', (done) => {
    expect(result).toEqual('Name can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = '';
  const email = '';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is not specified ', (done) => {
    expect(result).toEqual('Username can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = '';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is not specified ', (done) => {
    expect(result).toEqual('Email can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'ema@gmail.com';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Password is not specified ', (done) => {
    expect(result).toEqual('Password can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'ema@gmail.com';
  const password = '123456789';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is already used', (done) => {
    expect(result).toEqual('username must be unique');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Oliver';
  const email = 'ema@gmail.com';
  const password = '123456789';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is already used', (done) => {
    expect(result).toEqual('email must be unique');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Bilasiii';
  const email = 'bilasiii@gmail.com';
  const password = '123456789';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);

  it('should return a JSON object of the User if the details are correct', (done) => {
    expect(typeof result.dataValues).toEqual('object');
    done();
  }, 30000);

  afterEach((done) => {
    user.deleteUserss(email, () => {
    });
    done();
  }, 1000);
});

describe('When a register User signs in', () => {
  let result;
  const username = '';
  const password = '123456789';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is not stated', (done) => {
    expect(result).toEqual('Username can not be empty');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = 'Evidence';
  const password = '';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if password is not stated', (done) => {
    expect(result).toEqual('Password can not be empty');
    done();
  }, 10000);
});

describe('When an unregister User signs in', () => {
  let result;
  const username = 'Ibukun';
  const password = '123456789';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is not registered', (done) => {
    expect(result).toEqual('Failed, Username not Found');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = 'Evidence';
  const password = '12345678900';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is stated but password is not correct', (done) => {
    expect(result).toEqual('Failed, Wrong Password');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = 'Evidence';
  const password = '1234567890';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response[0];
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object if username and password are correct', (done) => {
    expect(typeof result.dataValues).toEqual('object');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = '';
  const creator = '1234567890';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if Group name is not defined', (done) => {
    expect(result).toEqual('Group Name can not be Empty');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Evidence';
  const creator = '';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if creator id is not defined', (done) => {
    expect(result).toEqual('creator id can not be Empty');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Friend';
  const creator = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if the User has created a group with same name', (done) => {
    expect(result).toEqual('Group Exists already');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Cohort12';
  const creator = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response[0].dataValues;
      done();
    }, 10000);
  }, 10000);
  it('should create group if it does not exist', (done) => {
    expect(typeof result).toEqual('object');
    done();
  }, 10000);

  afterEach((done) => {
    user.deleteGroup(groupName, creator, () => {
    });
    done();
  }, 1000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Evidence';
  const creator = '123';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if an unregistered User tries to create a group', (done) => {
    expect(result).toEqual('SequelizeForeignKeyConstraintError');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '';
  const userId = '123';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if group Id is not stated', (done) => {
    expect(result).toEqual('Group Id must be stated');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '1';
  const userId = '';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User Id is not stated', (done) => {
    expect(result).toEqual('User Id must be stated');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '1';
  const userId = '2';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User is already a member of the group', (done) => {
    expect(result).toEqual('User is already a member');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '12';
  const userId = '263';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response[0].dataValues;
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object if User is not a member yet', (done) => {
    expect(typeof result).toEqual('object');
    done();
  }, 10000);
  afterEach((done) => {
    user.deleteUserFromGroup(group, userId, adding, () => {
    });
    done();
  }, 1000);
});

describe('When a User posts message to a group', () => {
  let result;
  const to = '';
  const from = '1';
  const text = '';
  const priorityLevel = '';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Group is not specified', (done) => {
    expect(result).toEqual('Group must be specified');
    done();
  }, 10000);
});

describe('When a User posts message to a group', () => {
  let result;
  const to = '1';
  const from = '';
  const text = '';
  const priorityLevel = '';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Sender is not specified', (done) => {
    expect(result).toEqual('Sender must be specified');
    done();
  }, 10000);
});

describe('When a User posts message to a group', () => {
  let result;
  const to = '1';
  const from = '1';
  const text = '';
  const priorityLevel = '';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Message is not specified', (done) => {
    expect(result).toEqual('message cannot be null');
    done();
  }, 10000);
});


describe('When a User posts message to a group', () => {
  let result;
  const to = '1';
  const from = '1';
  const text = 'We are expecting you';
  const priorityLevel = 'Normal';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response.dataValues;
      done();
    }, 30000);
  }, 30000);
  it('should return a JSON oject if all details are specified', (done) => {
    expect(typeof result).toEqual('object');
    done();
  }, 30000);
});

describe('When a User requests for message posted to a group', () => {
  let result;
  const group = '10';
  beforeEach((done) => {
    user.retrieveMessage(group, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Empty array if no exist Message for the group', (done) => {
    expect(result.length).toEqual(0);
    done();
  }, 10000);
});

describe('When a User requests for message posted to a group', () => {
  let result;
  const group = '1';
  beforeEach((done) => {
    user.retrieveMessage(group, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a nonEmpty array if there are Message(s) for the group', (done) => {
    expect(result.length).toBeGreaterThan(0);
    done();
  }, 10000);
});

describe('When a User requests for message posted to a group', () => {
  let result;
  const group = 'Ema';
  beforeEach((done) => {
    user.retrieveMessage(group, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error message if there is no Such group', (done) => {
    expect(result.name).toEqual('SequelizeDatabaseError');
    done();
  }, 10000);
});

describe('when a User requests for list of members in a group', () => {
  const idObject = [
    { UserId: 1 },
    { UserId: 2 },
    { UserId: 3 }
  ];
  const idArray = [1, 2, 3];
  it('should return a Numeric array when an array of JSON object is passed', () => {
    expect(User.flattenId(idObject)).toEqual(idArray);
  });
  let result;
  beforeEach((done) => {
    user.getGroupMembers(1, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a list of all members in the group', () => {
    expect(result.length).toEqual(2);
  });
});

describe('When a User makes a request to the APIs', () => {
  // Unit test for routes
  it('should return status code 400', (done) => {
    api.post('/api/user/signup')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.text).toEqual('Name can not be empty');
            done(err);
          });
  }, 10000);

  xit('should return status code 200 When a new user signs up', (done) => {
    api.post('/api/user/signup')
          .send({
            name: 'Samuel Oke',
            username: 'Sammyyy',
            email: 'sammyyy@gmail.com',
            password: '1234567890'
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text).username).toEqual('Sammyyy');
            done(err);
          });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/group')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(res.text).toEqual('You are not allowed Here, Please Sign In.');
              done(err);
            });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/group/3/user')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(res.text).toEqual('You are not allowed Here, Please Sign In.');
              done(err);
            });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/group/1/message')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(res.text).toEqual('You are not allowed Here, Please Sign In.');
              done(err);
            });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.get('/api/group/eewewe/messages')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(res.text).toEqual('You are not allowed Here, Please Sign In.');
              done(err);
            });
  }, 10000);

  it('should return status code 404 When password is not correct', (done) => {
    api.post('/api/user/signin')
            .send({
              username: 'Evidence',
              password: 123456789
            })
            .end((err, res) => {
              expect(res.status).toEqual(404);
              expect(res.text).toEqual('Failed, Wrong Password');
              done(err);
            });
  }, 10000);

  it('should return status code 404 When Username is not correct', (done) => {
    api.post('/api/user/signin')
            .send({
              username: 'Eviden',
              password: 123456789
            })
            .end((err, res) => {
              expect(res.status).toEqual(404);
              expect(res.text).toEqual('Failed, Username not Found');
              done(err);
            });
  }, 10000);

  it('should return status code 200 When Username and Password is correct', (done) => {
    api.post('/api/user/signin')
            .send({
              username: 'Evidence',
              password: '1234567890'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              expect((JSON.parse(res.text)).length).toEqual(1);
              expect((JSON.parse(res.text))[0].username).toEqual('Evidence');
              done(err);
            });
  }, 10000);
  afterEach((done) => {
    app.close();
    done();
  }, 1000);
  app.close();
});

// Test  for protected routes
describe('When a signed in user tries to create a group', () => {
  let authenticatedSession;
  beforeEach((done) => {
    testSession.post('/api/user/signin')
    .send({
      username: 'Evidence',
      password: '1234567890'
    })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  }, 10000);
  it('should return status code 200 When a signed in user creates a group', (done) => {
    authenticatedSession.post('/api/group')
            .send({
              gpname: 'Andela'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);
  afterEach((done) => {
    user.deleteGroup('Andela21', 1, () => {
    });
    done();
  }, 1000);

  it('should return status code 200 When a signed in user adds a user to a group', (done) => {
    authenticatedSession.post('/api/group/229/user')
            .send({
              user: 46
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);
  afterEach((done) => {
    user.deleteUserFromGroup(229, 46, 1, () => {
    });
    done();
  }, 1000);

  it('should return status code 200 When a signed in user requests for messages for a group', (done) => {
    authenticatedSession.get('/api/group/229/user')
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);

  it('should return status code 200 When a signed in user requests for Users for a group', (done) => {
    authenticatedSession.get('/api/group/229/messages')
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);

  it('should return status code 200 When a signed in user adds a user to a group', (done) => {
    authenticatedSession.post('/api/group/229/message')
            .send({
              message: 'Off to see Kate Igori'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);
});

describe('When a User adds another User to a group', () => {
  let result;
  const group = '2299';
  const userId = '234';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error message if there is no Such group', (done) => {
    expect(result).toEqual('Key (GroupId)=(2299) is not present in table "Groups".');
    done();
  }, 10000);
});

describe('When a User adds another User to a group', () => {
  let result;
  const group = '229';
  const userId = '2633';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error message if there is no Such User', (done) => {
    expect(result).toEqual('Key (UserId)=(2633) is not present in table "Users".');
    done();
  }, 10000);
});
