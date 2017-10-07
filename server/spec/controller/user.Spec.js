import expect from 'expect';
import supertest from 'supertest';
import User from '../../helpers/User';
import app from '../../server';

const user = new User();
const api = new supertest(app);

describe('When a User makes a request to the APIs', () => {
  let token;
  it('should return error if name is not sent to /api/v1/user/signup', (done) => {
    api.post('/api/v1/user/signup')
          .send({
            password: 'qwerty123@',
            phone: '07030092113'
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(JSON.parse(res.text).message).toEqual('name cannot be null');
            done(err);
          });
  }, 10000);

  it('should return error if email is not sent to /api/v1/user/signup', (done) => {
    api.post('/api/v1/user/signup')
          .send({
            password: 'qwerty123@',
            name: 'Ema Alabi',
            username: 'Evidence',
            phone: '07030092113'
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(JSON.parse(res.text).message).toEqual('email cannot be null');
            done(err);
          });
  }, 10000);

  it('should return user object if all parameters are sent to "/api/v1/user/signup"', (done) => {
    api.post('/api/v1/user/signup')
          .send({
            password: 'qwerty123@',
            name: 'Ema Alabi',
            username: 'Evii',
            phone: '07063777160',
            email: 'emmanueli@gmail.com'
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            const response = JSON.parse(res.text);
            expect(response.message).toEqual('Registration Successful');
            expect(response.user.username).toEqual('Evii');
            expect(response.user.email).toEqual('emmanueli@gmail.com');
            token = response.token;
            expect(response.user.phone).toEqual('07063777160');
            done(err);
          });
  }, 10000);

  it('should return error when a user access "/api/v1/group" without logging in', (done) => {
    api.post('/api/v1/group')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              const response = JSON.parse(res.text);
              expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return error when a user access "/api/v1/group/3/user" without logging in', (done) => {
    api.post('/api/v1/group/3/user')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              const response = JSON.parse(res.text);
              expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return error when a user access "/api/v1/group/1/message" without logging in', (done) => {
    api.post('/api/v1/group/1/message')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              const response = JSON.parse(res.text);
              expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return error when a user access "/api/v1/group/eewewe/messages" without logging in', (done) => {
    api.get('/api/v1/group/eewewe/messages')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
  it('should return error when a user access "/api/v1/user/groups" without logging in', (done) => {
    api.get('/api/v1/user/groups')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
  it('should return error when a user access "/api/v1/user/groups" without logging in', (done) => {
    api.post('/api/v1/user/message/read')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return user object When a user signin', (done) => {
    api.post('/api/v1/user/signin')
            .send({
              username: 'Sammy',
              password: 'qwerty123@'
            })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              expect(JSON.parse(res.text).user.username).toEqual('Sammy');
              expect(JSON.parse(res.text).user.email).toEqual('sammy@gmail.com');
              expect(JSON.parse(res.text).user.name).toEqual('Samuel Oke');
              done(err);
            });
  }, 6000);
  it('should return error when a user signs in with invalid username', (done) => {
    api.post('/api/v1/user/signin')
            .send({
              username: '',
              password: 'qwerty123@'
            })
            .end((err, res) => {
              expect(res.status).toEqual(400);
              expect(JSON.parse(res.text).message).toEqual('Username can not be empty');
              done(err);
            });
  }, 3000);
  it('should return error when a user signs in with invalid password', (done) => {
    api.post('/api/v1/user/signin')
            .send({
              username: 'Sammy',
              password: 'qwqwqwqwqwqw'
            })
            .end((err, res) => {
              expect(res.status).toEqual(404);
              expect(JSON.parse(res.text).message).toEqual('Failed, User not found');
              done(err);
            });
  }, 3000);
  it('should return user object when a signed in user requests for Other users', (done) => {
    const url = '/api/v1/user/all';
    api.get(url)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(typeof JSON.parse(res.text).users).toEqual('object');
            expect((JSON.parse(res.text).users).length).toBeGreaterThan(0);
            expect(JSON.parse(res.text).users[0].username).toEqual('Trial1');
            done(err);
          });
  }, 3000);
  it('should return message object when a signed in user requests for his archived messages', (done) => {
    const url = '/api/v1/user/1/messages/archived';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text)).toEqual('object');
          expect(JSON.parse(res.text).message).toEqual('Archived Messages');
          done(err);
        });
  }, 3000);

  it('should return error when an unregistered user requests for password reset', (done) => {
    const url = '/api/v1/user/forgotpassword';
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

  it('should return error user requests for password reset with email undefined', (done) => {
    const url = '/api/v1/user/forgotpassword';
    api.post(url)
        .send({
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('Please Supply your Email');
          done(err);
        });
  }, 3000);

  it('should return success when a registered user request for password reset', (done) => {
    const url = '/api/v1/user/forgotpassword';
    api.post(url)
        .send({
          email: 'sammy@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('A mail has being sent to you.');
          done(err);
        });
  }, 3000);

  it('should return error when a register user request for password reset with unsecure password', (done) => {
    const url = '/api/v1/user/newpassword';
    api.post(url)
        .send({
          userKey: 'sammy@gmail.com',
          newPassword: 'qwerty',
          password: 'qwerty'
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          const errorMessage = 'Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8';
          expect(JSON.parse(res.text).message).toEqual(errorMessage);
          done(err);
        });
  }, 3000);
  it('should return error when a register user request for password reset but password does not match', (done) => {
    const url = '/api/v1/user/newpassword';
    api.post(url)
        .send({
          email: 'sammy@gmail.com',
          newPassword: 'qwerty123@',
          password: 'qwerty12@3'
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('Invalid Input Supplied.');
          done(err);
        });
  }, 3000);
  it('should return error when a registered user searches for other users with invalid data', (done) => {
    const url = '/api/v1/users/search';
    api.post(url)
        .set('authorization', token)
        .send({
          search: 'dean'
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('Please supply a search term');
          done(err);
        });
  }, 3000);
  it('should return success when a register user searches for other users', (done) => {
    const url = '/api/v1/users/search';
    api.post(url)
        .set('authorization', token)
        .send({
          searchTerm: 'Sam',
          offset: 0,
          groupId: 1
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Search Result');
          expect(JSON.parse(res.text).users[0].username).toEqual('Sammy');
          expect(JSON.parse(res.text).count).toEqual(1);
          done(err);
        });
  }, 3000);
});

describe('When a User signs up with google+', () => {
  it('should return user object if the user has a google account', (done) => {
    api.post('/api/v1/user/google')
          .send({
            name: 'ema alabi',
            email: 'emaala@gmail.com',
            state: 'Sign Up'
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).user.username).toEqual('emaala');
            done(err);
          });
  }, 10000);
  it('should return error if the user has an account already', (done) => {
    api.post('/api/v1/user/google')
          .send({
            name: 'ema alabi',
            email: 'emmanueli@gmail.com',
            state: 'Sign Up'
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done(err);
          });
  }, 10000);
});

describe('When a User signs in with google+', () => {
  it('should return success if the user has a google account', (done) => {
    api.post('/api/v1/user/google')
          .send({
            name: 'ema alabi',
            email: 'emaala@gmail.com',
            state: 'Sign In'
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text).user.username).toEqual('emaala');
            done(err);
          });
  }, 15000);
  it('should return error if the user is not registered with google+', (done) => {
    api.post('/api/v1/user/google')
          .send({
            state: 'Sign In',
            name: 'Ema Alabi',
            username: 'Evi',
            email: 'emmanuel@gmail.com'
          })
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
  }, 15000);
  afterEach((done) => {
    user.deleteUsers('emmanuel@gmail.com', () => {
    });
    done();
  }, 1000);
}, 3000);
