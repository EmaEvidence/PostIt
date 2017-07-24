import expect from 'expect';
import supertest from 'supertest';
import User from '../src/user';
import app from '../server';

const user = new User();
const api = new supertest(app);
// const testSession = session(app);

describe('when a new user supplies a password', () => {
  const password = '1234qwe@2';
  const validity = User.validatePassword(password);
  it('should return valid if it meets the specification', () => {
    expect(validity).toEqual('valid');
  });
  const wrongPassword = '12345678';
  const validityWrong = User.validatePassword(wrongPassword);
  it('should return valid if it meets the specification', () => {
    expect(validityWrong).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
  });
});

describe('When a new User signs up', () => {
  let result;
  const name = '';
  const username = '';
  const email = '';
  const password = 'qwert@787';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
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
  const password = 'qwert@787';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is not specified ', (done) => {
    expect(result).toEqual('Username can not be empty and can only be Alphabets and Numbers');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = '';
  const password = 'qwert@787';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is not specified ', (done) => {
    expect(result).toEqual('Please supply a valid Email');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'ema@gmail.com';
  const password = '';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Password is not specified ', (done) => {
    expect(result).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'ema@gmail.com';
  const password = 'qwert@787';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if phone number is empty', (done) => {
    expect(result).toEqual('Please supply a valid Phone Number.');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let sucessResult;
  let usernameError;
  const name = 'Emaa Alaa';
  const username = 'Bilaasiii';
  const email = 'bilasiii@gmail.com';
  const password = 'qwert@787';
  const phone = '09088887777';

  beforeEach((done) => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    user.signUp(name, username, email, password, phone, (response) => {
      sucessResult = response;
    });
    done();
  }, 10000);
  xit('should return a JSON object of the User if the details are correct', (done) => {
    expect(sucessResult.name).toEqual('Emaa Alaa');
    done();
  });

  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (errResponse) => {
      usernameError = errResponse;
      done();
    }, 5000);
  }, 5000);
  xit('should return Error message if Username is already used', (done) => {
    expect(usernameError).toEqual('username must be unique');
    done();
  }, 5000);

  afterEach((done) => {
    user.deleteUserss('bilasiii@gmail.com', () => {
      done();
    }, 10000);
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Oliver';
  const email = 'bilasi@gmail.com';
  const password = 'qwert@787';
  const phone = '07034567788';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return the email in the response', (done) => {
    expect(result.email).toEqual('bilasi@gmail.com');
    done();
  }, 10000);
  afterEach((done) => {
    user.deleteUserss('bilasi@gmail.com', () => {
      done();
    }, 10000);
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

xdescribe('When an unregister User signs in', () => {
  let result;
  const username = 'Bilasiiinn';
  const password = 'qwert@787m';
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

xdescribe('When a register User signs in', () => {
  let result;
  const username = 'Bilasiii';
  const password = 'qwert@';
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

xdescribe('When a register User signs in', () => {
  let result;
  const username = 'Bilasiii';
  const password = 'qwert@787';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object if username and password are correct', (done) => {
    expect(result.username).toEqual('Bilasiii');
    done();
  }, 10000);
});

xdescribe('When a User creates a group', () => {
  let result;
  const groupName = '';
  const creator = '1234567890';
  const users = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, users, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if Group name is not defined', (done) => {
    expect(result).toEqual('Group name can Only contain Alphabets, Numbers and can not be Empty.');
    done();
  }, 10000);
});

// Add cohort1 into the database
describe('When a User creates a group', () => {
  let result;
  const groupName = 'Cohort1';
  const creator = '1';
  const users = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, users, () => {
      user.createGroup(groupName, creator, users, (response) => {
        result = response;
        done();
      }, 10000);
    }, 10000);
  }, 10000);
  xit('should return a Error Message if group exists', (done) => {
    expect(result).toEqual('Group Exists already');
    done();
  }, 10000);
  afterEach((done) => {
    user.deleteGroup(groupName, creator, () => {
    });
    done();
  }, 1000);
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

describe('When a User requests for message posted to a group', () => {
  let result;
  const group = '10';
  beforeEach((done) => {
    user.retrieveMessage(group, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  xit('should return an Empty array if non exist Message for the group', (done) => {
    expect(result.length).toEqual(0);
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '0';
  const userId = '0';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  xit('should return a JSON object if User is not a member yet', (done) => {
    expect(result).toEqual('Key (UserId)=(0) is not present in table "Users".');
    done();
  }, 10000);
  afterEach((done) => {
    user.deleteUserFromGroup(group, userId, adding, () => {
    });
    done();
  }, 1000);
});

// supply user id that is already a member of a group
xdescribe('When a User adds another user to a group', () => {
  let result;
  const group = '11';
  const userId = '6';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User is already a member of the group', (done) => {
    expect(result).toEqual('Key ("UserId", "GroupId")=(6, 11) already exists.');
    done();
  }, 10000);
});

// supply id of a group existing in your database
xdescribe('When a User posts message to a group', () => {
  let result;
  const to = '11';
  const from = '8';
  const text = 'We are expecting you';
  const priorityLevel = 'Normal';
  beforeEach((done) => {
    user.postMessage(to, from, text, priorityLevel, (response) => {
      result = response;
      done();
    }, 30000);
  }, 30000);
  it('should return a JSON oject if all details are specified', (done) => {
    expect(result.message).toEqual('We are expecting you');
    done();
  }, 30000);
});
// not
xdescribe('When a User requests for message posted to a group', () => {
  let result;
  const group = '11';
  beforeEach((done) => {
    user.retrieveMessage(group, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  xit('should return a nonEmpty array if there are Message(s) for the group', (done) => {
    expect(result.length).toBeGreaterThan(0);
    done();
  }, 10000);
});

xdescribe('When a User creates a group', () => {
  let result;
  const groupName = 'Camper2';
  const creator = '8';
  const users = '';
  beforeEach((done) => {
    user.createGroup(groupName, creator, users, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should create group if it does not exist', (done) => {
    expect(result.groupname).toEqual('Camper2');
    done();
  }, 10000);

  afterEach((done) => {
    user.deleteGroup(groupName, creator, () => {
    });
    done();
  }, 1000);
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

// till this level require data in the database

describe('When a User requests for message posted to a group', () => {
  let result;
  const group = '11';
  beforeEach((done) => {
    user.retrieveMessage(group, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  xit('should return a nonEmpty array if there are Message(s) for the group', (done) => {
    expect(result.length).toBeGreaterThan(0);
    done();
  }, 10000);
});

xdescribe('When a User creates a group', () => {
  let result;
  const groupName = 'Camper';
  const creator = '1';
  const users = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, users, () => {
      user.createGroup(groupName, creator, users, (response) => {
        result = response;
        done();
      }, 10000);
    }, 10000);
  }, 10000);
  it('should return a Error Message if group exists', (done) => {
    expect(result).toEqual('group_name must be unique');
    done();
  }, 10000);
  afterEach((done) => {
    user.deleteGroup(groupName, creator, () => {
    });
    done();
  }, 1000);
});

describe('when a User requests for list of members in a group', () => {
  const idObjectuser = [
    { UserId: 1 },
    { UserId: 2 },
    { UserId: 3 }
  ];
  const idObjectgroup = [
    { GroupId: 1 },
    { GroupId: 2 },
    { GroupId: 3 }
  ];
  const idObject = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  const idArrayuser = [1, 2, 3];
  const idArraygroup = [1, 2, 3];
  const idArray = [1, 2, 3];
  it('should return a Numeric array when an array of JSON object is passed', () => {
    expect(User.flattenId(idObjectuser)).toEqual(idArrayuser);
  });
  it('should return a Numeric array when an array of JSON object is passed', () => {
    expect(User.flattenGroupId(idObjectgroup)).toEqual(idArraygroup);
  });
  it('should return a Numeric array when an array of JSON object is passed', () => {
    expect(User.flattenUserId(idObject)).toEqual(idArray);
  });
  let result;
  beforeEach((done) => {
    user.getGroupMembers(92, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  // not relevant not increasing coverage
  xit('should return a list of all members in the group', () => {
    expect(result.length).toBeGreaterThan(0);
  });
});
// Not increasing coverage
xdescribe('When a User adds another User to a group', () => {
  let result;
  const group = '2299';
  const userId = '8';
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
  afterEach((done) => {
    user.deleteUserss('bilasiii@gmail.com', () => {
      user.deleteUserss('sammyyy@gmail.com', () => {
      });
      done();
    }, 10000);
  }, 10000);
});

describe('When a User makes a request to the APIs', () => {
  // Unit test for routes
  it('should return status code 404 if the route is not existing', (done) => {
    api.post('/api/user/signupssdsdssdsds')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(404);
            expect(res.text).toEqual('Page Not Found');
            done(err);
          });
  }, 10000);

  it('should return status code 200 if the request is sent to', (done) => {
    api.get('/')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.text).toEqual('Post It API running');
            done(err);
          });
  }, 10000);

  it('should return status code 404 if the route is not existing', (done) => {
    api.get('/api/user/signupssdsdssdsds')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(404);
            expect(res.text).toEqual('Page Not Found');
            done(err);
          });
  }, 10000);

  it('should return status code 400 if no parameter is sent', (done) => {
    api.post('/api/user/signup')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(JSON.parse(res.text).message).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
            done(err);
          });
  }, 10000);

  it('should return status code 200 When a new user signs up', (done) => {
    api.post('/api/user/signup')
          .send({
            name: 'Samuel Oke',
            username: 'Sammyyy',
            email: 'sammyyy@gmail.com',
            password: '09oiuy@hh',
            phone: '09077889900'
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text).message).toEqual('Registration Successful');
            done(err);
          });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/group')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/group/3/user')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/group/1/message')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.get('/api/group/eewewe/messages')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return status code 404 When password is not correct', (done) => {
    api.post('/api/user/signin')
            .send({
              username: 'Sammyyy',
              password: '09oiuy@h'
            })
            .end((err, res) => {
              expect(res.status).toEqual(404);
              expect(JSON.parse(res.text).message).toEqual('Failed, Wrong Password');
              done(err);
            });
  }, 10000);

  it('should return status code 404 When Username is not correct', (done) => {
    api.post('/api/user/signin')
            .send({
              username: 'Sammyy',
              password: 123456789
            })
            .end((err, res) => {
              expect(res.status).toEqual(404);
              expect(JSON.parse(res.text).message).toEqual('Failed, Username not Found');
              done(err);
            });
  }, 10000);

  it('should return status code 200 When Username and Password is correct', (done) => {
    api.post('/api/user/signin')
            .send({
              username: 'Sammyyy',
              password: '09oiuy@hh'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              expect(JSON.parse(res.text).data.username).toEqual('Sammyyy');
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
describe('When a signed in user', () => {
  let token;
  beforeEach((done) => {
    api.post('/api/user/signin')
    .send({
      username: 'Sammyyy',
      password: '09oiuy@hh'
    })
      .expect((res) => {
        token = JSON.parse(res.text).data.token;
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  }, 10000);
  it('creates a group should return status code 200', (done) => {
    api.post('/api/group')
            .set('authorization', token)
            .send({
              gpname: 'Andela21'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);
  afterEach((done) => {
    user.deleteGroupWithName('Andela21', () => {
    });
    done();
  }, 1000);

  xit('adds a user to a group should return status code 200', (done) => {
    api.post('/api/group/11/user')
            .set('authorization', token)
            .send({
              user: 6
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

  xit('requests for Users for a group should return status code 200', (done) => {
    api.get('/api/group/11/user')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);


  xit('requests for messages for a group should return status code 200', (done) => {
    api.get('/api/group/11/messages')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);

  xit('sends message to a group should return status code 200', (done) => {
    api.post('/api/group/11/message')
            .send({
              message: 'Off to see Kate Igori'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done(err);
            });
  }, 10000);
});
