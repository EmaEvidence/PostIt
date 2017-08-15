import expect from 'expect';
import supertest from 'supertest';
import User from '../src/user';
import app from '../server';

const user = new User();
const api = new supertest(app);
let newUserId;

describe('When a new User supplies a password', () => {
  const password = 'qwerty123@';
  const wrongPassword = '1234567890';
  const valid = User.validatePassword(password);
  const invalid = User.validatePassword(wrongPassword);
  it('should return Error message its in a wrong format', () => {
    expect(valid).toEqual('valid');
  });
  it('should return valid if its in a right format', () => {
    expect(invalid).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
  });
});

describe('when an Array of JSON object with Ids as keys is supplied', () => {
  const idObject = [
    { UserId: 1 },
    { UserId: 2 },
    { UserId: 3 }
  ];
  const UserIdObject = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  const GroupIdObject = [
    { GroupId: 1 },
    { GroupId: 2 },
    { GroupId: 3 }
  ];
  const idArray = [1, 2, 3];
  it('should return a Numeric array', () => {
    expect(User.flattenId(idObject)).toEqual(idArray);
  });
  it('should return a Numeric array', () => {
    expect(User.flattenUserId(UserIdObject)).toEqual(idArray);
  });
  it('should return a Numeric array', () => {
    expect(User.flattenGroupId(GroupIdObject)).toEqual(idArray);
  });
});

xdescribe('when a text notification is sent', () => {
  const payload = {
    to: '07063747160',
    from: 'Post App',
    message: 'You have a new Message on Post It App. Testing'
  };
  const wrongPayload = {
    to: '',
    from: 'Post App',
    body: 'You have a new Message on Post It App. Testing'
  };
  let rightResult;
  beforeEach((done) => {
    User.sendText(payload, (result) => {
      rightResult = result;
      done();
    }, 3000);
  }, 10000);

  it('should "Message Notification Sent" if sent', () => {
    expect(rightResult).toEqual('Message Notification Sent');
  });
  let wrongResult;
  beforeEach((done) => {
    User.sendText(wrongPayload, (result) => {
      wrongResult = result;
      done();
    }, 3000);
  }, 10000);
  it('should return "Error Sending Message Notification" if not sent', () => {
    expect(wrongResult).toEqual('Error Sending Message Notification');
  });
});

xdescribe('when a mail notification is sent', () => {
  const mailOptions = {
    from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
    to: 'emmanuelalabi563@gmail.com',
    subject: 'New Message Notification',
    text: 'You have a new message in Post It App.',
    html: '<a href="#">Click Here To Access it</a>'
  };
  const wrongMailOptions = {
    fro: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
    t: 'emm@gmail.com',
    subject: 'New Message Notification',
    body: 'You have a new message in Post It App.',
    html: '<a href="#">Click Here To Access it</a>'
  };
  let result;
  let wrongResult;
  beforeEach((done) => {
    User.mailer(mailOptions, (msg) => {
      result = msg;
      done();
    }, 3000);
  }, 3000);
  it('should return "Mail Sent" if sent', (done) => {
    expect(result).toEqual('Mail Sent');
    done();
  }, 10000);
  beforeEach((done) => {
    User.mailer(wrongMailOptions, (msg) => {
      wrongResult = msg;
      done();
    }, 3000);
  }, 3000);
  it('should return "Mail Not Sent" if not sent', (done) => {
    expect(wrongResult).toEqual('Mail Not Sent');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = '';
  const username = '';
  const email = '';
  const password = '';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if password is not specified ', (done) => {
    expect(result).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'emmanuelalabi563@gmail.com';
  const password = 'qwerty123@';
  const phone = '07063747160';
  let userId;

  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);

  it('should return a JSON object of the User if the details are correct', (done) => {
    expect(typeof result).toEqual('object');
    done();
  }, 3000);

  it('should return "Evidence" as the value of username key if the details are correct', (done) => {
    expect(result.username).toEqual('Evidence');
    done();
  }, 3000);

  let error;
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      error = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the username exist', (done) => {
    expect(error).toEqual('username must be unique');
    done();
  }, 3000);

  let emailError;
  beforeEach((done) => {
    user.signUp(name, 'Evi', email, password, phone, (response) => {
      emailError = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the email exist', (done) => {
    expect(emailError).toEqual('email must be unique');
    done();
  }, 3000);

  let signInResult;
  beforeEach((done) => {
    user.logIn('Evidenc', 'qwerty123@', (response) => {
      signInResult = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the user signs in with wrong details after signing up', (done) => {
    expect(signInResult).toEqual('Failed, Username not Found');
    done();
  }, 3000);

  let signInResult2;
  beforeEach((done) => {
    user.logIn('Evidence', 'qwerty123', (response) => {
      signInResult2 = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the user signs in with wrong details after signing up', (done) => {
    expect(signInResult2).toEqual('Failed, Wrong Password');
    done();
  }, 3000);

  let signedIn;
  beforeEach((done) => {
    user.logIn('Evidence', 'qwerty123@', (response) => {
      signedIn = response;
      userId = signedIn.id;
      done();
    }, 10000);
  }, 10000);

  it('should return the details of the user when he signs in with correct details after signing up', (done) => {
    expect(typeof signedIn).toEqual('object');
    done();
  }, 3000);

  it('should return "Evidence" as the value of username key if the user signs in with correct details after signing up', (done) => {
    expect(signedIn.username).toEqual('Evidence');
    done();
  }, 3000);

  let group;
  let groupId;
  beforeEach((done) => {
    user.createGroup('Andela', userId, 'Evidence', (response) => {
      group = response;
      groupId = response.id;
      done();
    }, 3000);
  }, 3000);
  it('should return "Andela" as the group name when the user creates a group with correct details', (done) => {
    expect(group.groupname).toEqual('Andela');
    done();
  }, 3000);

  let groupError;
  beforeEach((done) => {
    user.createGroup('Andela', userId, 'Evidence', (response) => {
      groupError = response;
      done();
    }, 3000);
  }, 3000);
  it('should return Error Message if the  group the signed user creates exists', (done) => {
    expect(groupError).toEqual('Group Exists already');
    done();
  }, 3000);

  let addedUser;
  beforeEach((done) => {
    user.signUp('Nuru Ibra', 'Noordean', 'noordean@gmail.com', 'qwerty123@', '08020304050', (response) => {
      newUserId = response.id;
      user.addUsers(groupId, newUserId, userId, (added) => {
        addedUser = added;
      });
      done();
    }, 3000);
  }, 3000);
  xit('should return with true when a signed user adds another user to a group', (done) => {
    expect(addedUser[1]).toEqual(true);
    done();
  }, 3000);

  let postResult;
  beforeEach((done) => {
    user.postMessage(groupId, userId, 'Hello Everyone', 'Normal', (response) => {
      postResult = response;
    }, 3000);
    done();
  });
  it('should return "Hello Everyone" when a signed user posts message to a group', (done) => {
    expect(postResult.message).toEqual('Hello Everyone');
    done();
  }, 3000);

  let retrivalResult;
  beforeEach((done) => {
    user.retrieveMessage(groupId, (response) => {
      retrivalResult = response;
    }, 3000);
    done();
  });
  it(' after sign up request for messages for a group should return messages', (done) => {
    expect(typeof retrivalResult).toEqual('object');
    done();
  }, 3000);

  let userGroups;
  beforeEach((done) => {
    user.getUserGroups(userId, (response) => {
      userGroups = response;
    }, 3000);
    done();
  });
  it(' signs in, request for groups he belongs to should return array of groups', (done) => {
    expect(typeof userGroups).toEqual('object');
    done();
  }, 3000);

  afterEach((done) => {
    user.deleteUserss(email, () => {
      user.deleteGroupWithName('Andela', () => {
        user.deleteUserFromGroup(groupId, newUserId, userId, () => {
        });
      });
    });
    done();
  }, 1000);
});

// API test

describe('When a User makes a request to the APIs', () => {
  // Unit test for routes
  it('should return status code 200', (done) => {
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
    api.post('/api/user/signupssdsdssdsds')
          .send({
          })
          .end((err, res) => {
            expect(res.status).toEqual(404);
            expect(res.text).toEqual('Page Not Found');
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
            password: 'qwerty123@'
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(JSON.parse(res.text).message).toEqual('name cannot be null');
            done(err);
          });
  }, 10000);

  it('should return status code 400 if no parameter is sent', (done) => {
    api.post('/api/user/signup')
          .send({
            password: 'qwerty123@',
            name: 'Ema Alabi',
            username: 'Evidence'
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(JSON.parse(res.text).message).toEqual('email cannot be null');
            done(err);
          });
  }, 10000);

  it('should return status code 400 if no parameter is sent', (done) => {
    api.post('/api/user/signup')
          .send({
            password: 'qwerty123@',
            name: 'Ema Alabi',
            username: 'Evi',
            phone: '07063747160',
            email: 'emmanuel@gmail.com'
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).message).toEqual('Registration Successful');
            done(err);
          });
  }, 10000);
  afterEach((done) => {
    user.deleteUserss('emmanuel@gmail.com', () => {
    });
    done();
  }, 1000);

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
  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.get('/api/user/groups')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.post('/api/user/message/read')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
  it('should return status code 403 When a user tries to access the APIs without logging in', (done) => {
    api.get('/api/users/search')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(403);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
  afterEach((done) => {
    user.deleteGroup('Andela21', 1, () => {
    });
    done();
  }, 1000);
});

describe('when a user makes a request to the APIs', () => {
  let token;
  let signedInId;
  it('should return status code 201 When a new user signs up', (done) => {
    api.post('/api/user/signup')
          .send({
            name: 'Samuel Oke',
            username: 'Sammy',
            email: 'sammy@gmail.com',
            password: 'qwerty123@',
            phone: '07063747160'
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).data.username).toEqual('Sammy');
            done(err);
          });
  }, 3000);
  it('should return status code 200 When a user signin', (done) => {
    api.post('/api/user/signin')
          .send({
            username: 'Sammy',
            password: 'qwerty123@'
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text).data.username).toEqual('Sammy');
            token = JSON.parse(res.text).data.token;
            signedInId = JSON.parse(res.text).data.id;
            done(err);
          });
  }, 3000);
  let groupId;
  it('should return status code 201 When a signed in user creates a group', (done) => {
    api.post('/api/group')
          .set('authorization', token)
          .send({
            gpname: 'Camper',
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).data.groupname).toEqual('Camper');
            groupId = JSON.parse(res.text).data.id;
            done(err);
          });
  }, 3000);
  it('should return status code 400 When a signed in user adds an unregistered user to a group', (done) => {
    const url = `/api/group/${groupId}/user`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: '',
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('User Id must be stated');
          done(err);
        });
  }, 3000);
  it('should return status code 200 When a signed in user posts to a group', (done) => {
    const url = `/api/group/${groupId}/message`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: newUserId,
          message: 'How are you'
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Message Added.');
          done(err);
        });
  }, 3000);
  it('should return status code 400 and error message When a signed in user posts to a non existing group', (done) => {
    const url = '/api/group/0/message';
    api.post(url)
        .set('authorization', token)
        .send({
          user: newUserId,
          message: 'How are you'
        })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('Group does not Exist');
          done(err);
        });
  }, 3000);
  it('should return 200 and messages When a signed in user request for messages for an existing group', (done) => {
    const url = `/api/group/${groupId}/messages`;
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Message Retrival Successful');
          done(err);
        });
  }, 3000);
  it('should return error 404 and error message When a signed in user request for messages for non existing group', (done) => {
    const url = '/api/group/0/messages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('No Message For that Group');
          done(err);
        });
  }, 3000);
  it('should return error 404 and error message When a signed in user request for messages for non existing group', (done) => {
    api.get('/api/group/uiy/messages')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('Invalid Group Selected');
          done(err);
        });
  }, 3000);
  it('should return status code 200 When a signed in user requests for members of an existing group', (done) => {
    const url = `/api/group/${groupId}/users`;
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Users Retrival Successful');
          done(err);
        });
  }, 3000);
  it('should return 404 and error messages When a signed in user request for members of non existing group', (done) => {
    const url = '/api/group/0/users';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('No Such Group');
          done(err);
        });
  }, 3000);
  it('should return 200 and messages When a signed in user request for Other users', (done) => {
    const url = '/api/user/all';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).data).toEqual('object');
          expect(JSON.parse(res.text).data.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).data[1].username).toEqual('Sammy' || 'Noordean');
          done(err);
        });
  }, 3000);
  it('should return 200 and messages When a signed in user request for his groups', (done) => {
    const url = '/api/user/groups';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).data).toEqual('object');
          expect(JSON.parse(res.text).data.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).data[0].group_name).toEqual('Camper');
          done(err);
        });
  }, 3000);
  it('should return 200 and messages When a signed in user request for his personal messages', (done) => {
    const url = '/api/user/mymessage';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).data).toEqual('object');
          expect(JSON.parse(res.text).data.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).data[0].message).toEqual('How are you');
          done(err);
        });
  }, 3000);

  it('should return 200 and messages When a signed in user request for his archived messages', (done) => {
    const url = '/api/user/archivedMessages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).data).toEqual('object');
          // expect(JSON.parse(res.text).data.length).toBeGreaterThan(0);
          // expect(JSON.parse(res.text).data[0].message).toEqual('How are you');
          done(err);
        });
  }, 3000);

  it('should return 404 and Error message When an unregister fellow request for password reset', (done) => {
    const url = '/api/user/forgetpassword';
    api.post(url)
        .send({
          email: 'emaa@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('Email Address Not found');
          done(err);
        });
  }, 3000);

  it('should return 200 and success message When a register user request for password reset', (done) => {
    const url = '/api/user/forgetpassword';
    api.post(url)
        .send({
          email: 'noordean@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('A mail has being sent to you.');
          done(err);
        });
  }, 3000);

  it('should return 200 and success message When a register user request for password reset', (done) => {
    const url = '/api/user/forgetpassword';
    api.post(url)
        .send({
          email: 'noordean@gmail.com',
          cpassword: 'qwerty123@',
          password: 'qwerty123@'
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Password Updated, please sign In with the new Password');
          done(err);
        });
  }, 3000);
  it('should return 403 and Error message When a register user request for password reset but password does not match', (done) => {
    const url = '/api/user/forgetpassword';
    api.post(url)
        .send({
          email: 'noordean@gmail.com',
          cpassword: 'qwerty123@',
          password: 'qwerty12@3'
        })
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(JSON.parse(res.text).message).toEqual('Password do not match.');
          done(err);
        });
  }, 3000);
  it('should return 403 and error message When a register user searches for other users but search term missing', (done) => {
    const url = '/api/users/search';
    api.get(url)
        .set('authorization', token)
        .send({
          search: 'dean'
        })
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(JSON.parse(res.text).message).toEqual('Please supply a search term');
          done(err);
        });
  }, 3000);
  it('should return 200 and success message When a register user searches for other users', (done) => {
    const url = '/api/users/search';
    api.get(url)
        .set('authorization', token)
        .send({
          searchTerm: 'dean'
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Search Result');
          expect(JSON.parse(res.text).data[0].username).toEqual('Noordean');
          done(err);
        });
  }, 3000);
  it('should return 404 and error message When a register user accesses no message', (done) => {
    const url = '/api/user/message/read';
    api.post(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('No message Specified');
          done(err);
        });
  }, 3000);
  it('should return 404 and error message When a register user supplies wrong message', (done) => {
    const url = '/api/user/message/read';
    api.post(url)
        .set('authorization', token)
        .send({
          messageId: 1
        })
        .end((err, res) => {
          expect(res.status).toEqual(500);
          expect(JSON.parse(res.text).message).toEqual('Error Reading Message');
          done(err);
        });
  }, 3000);
  it('should return 200 and success message When a register user deletes his account', (done) => {
    const url = '/api/delete';
    api.post(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Deleted');
          done(err);
        });
  }, 3000);
});
afterAll((done) => {
  user.clearTables(() => {
  });
  done();
}, 1000);
