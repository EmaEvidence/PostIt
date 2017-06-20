import expect from 'expect';
import supertest from 'supertest';
import User from '../src/user';
import app from '../server';

const user = new User();
const api = new supertest(app);

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

xdescribe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Bilasi';
  const email = 'bilasi@gmail.com';
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
  }, 10000);
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

xdescribe('When a User creates a group', () => {
  let result;
  const groupName = 'Cohort1';
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

xdescribe('When a User adds another user to a group', () => {
  let result;
  const group = '12';
  const userId = '2';
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
  const priorityLevel = '';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if Priority is not specified', (done) => {
    expect(result).toEqual('priority cannot be null');
    done();
  }, 10000);
});

xdescribe('When a User posts message to a group', () => {
  let result;
  const to = '1';
  const from = '1';
  const text = 'We are expecting you';
  const priorityLevel = '1';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response[0].dataValues;
      done();
    }, 30000);
  }, 30000);
  it('should return a JSON oject if all details are specified', (done) => {
    expect(result).toEqual('object');
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
  it('should return a nonEmpty array if there are Message(s) for the group', (done) => {
    expect(result.name).toEqual('SequelizeDatabaseError');
    done();
  }, 10000);
});

describe('When a User makes a request to the APIs', () => {
  xit('should return status message 200', (done) => {
    api.post('/api/user/signup')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            console.log(res.status);
            console.log(res);
            done(err);
          });
  }, 10000);

  xit('should return status message 200', (done) => {
    api.get('/api/group/eewewe/messages')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              console.log(res.status);
              console.log(res);
              done(err);
            });
  }, 10000);

  xit('should return status message 200', (done) => {
    api.post('/api/group/1/message')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              console.log(res.status);
              console.log(res);
              done(err);
            });
  }, 10000);
  xit('should return status message 200', (done) => {
    api.post('/api/group/3/user')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              console.log(res.status);
              console.log(res);
              done(err);
            });
  }, 10000);
  xit('should return status code 200', (done) => {
    api.post('/api/group')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              console.log(res.status);
              console.log(res);
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
});

app.close();
