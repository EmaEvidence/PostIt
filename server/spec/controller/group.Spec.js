import expect from 'expect';
import supertest from 'supertest';

import User from '../../helpers/user';
import app from '../../server';

const user = new User();
const api = new supertest(app);
let newUserId;

describe('When a User makes a request to the APIs', () => {
  it('should return status code 401 when a user access "/api/v1/group" without logging in', (done) => {
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

  it('should return code 401 when a user access "/api/v1/group/3/user" without logging in', (done) => {
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

  it('should return code 401 when a user access "/api/v1/group/1/message" without logging in', (done) => {
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

  it('should return code 401 when a user access "/api/v1/group/eewewe/messages" without logging in', (done) => {
    api.get('/api/v1/group/eewewe/messages')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
});
describe('when a user makes a request to the APIs', () => {
  let token;
  let signedInId;
  beforeAll((done) => {
    api.post('/api/v1/user/signup')
          .send({
            name: 'Trial Oke',
            username: 'Trial1',
            email: 'trial1@gmail.com',
            password: 'qwerty123@',
            phone: '07011747160'
          })
          .end((err, res) => {
            token = JSON.parse(res.text).user.token;
            signedInId = JSON.parse(res.text).user.id;
            done();
          });
  }, 10000);
  it('should return status code 201 when a new user signs up', (done) => {
    api.post('/api/v1/user/signup')
          .send({
            name: 'Samuel Oke',
            username: 'Sammy',
            email: 'sammy@gmail.com',
            password: 'qwerty123@',
            phone: '07063747160'
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).user.username).toEqual('Sammy');
            done(err);
          });
  }, 3000);
  it('should return status code 200 when a user signin', (done) => {
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
  }, 3000);
  let groupId;
  it('should return status code 201 when a signed in user creates a group', (done) => {
    api.post('/api/v1/group')
          .set('authorization', token)
          .send({
            groupName: 'Camper',
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).group.groupName).toEqual('Camper');
            groupId = JSON.parse(res.text).group.id;
            done(err);
          });
  }, 3000);
  it('should return error when a signed in user sends invalid data when adding member', (done) => {
    const url = `/api/v1/group/${groupId}/user`;
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
  it('should return error when a signed in user sends invalid data when adding member', (done) => {
    const url = `/api/v1/group/${groupId}/user`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: 0,
        })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('User Does not exist');
          done(err);
        });
  }, 3000);
  it('should return message object when a signed in user posts to a group', (done) => {
    const url = `/api/v1/group/${groupId}/message`;
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
  it('should return message object when a signed in user request for his personal messages', (done) => {
    const url = '/api/v1/user/messages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).messages).toEqual('object');
          expect(JSON.parse(res.text).messages.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).messages[0].message).toEqual('How are you');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user posts to a group with invalid data', (done) => {
    const url = `/api/v1/group/${groupId}/message`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: '',
          message: '',
          priorty: 'Wicked'
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('message cannot be empty');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user posts to a group with invalid data', (done) => {
    const url = `/api/v1/group/${groupId}/message`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: '',
          message: 'While we are here',
          priority: 'Wicked'
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('Wrong Priority level');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user posts to a non existing group', (done) => {
    const url = '/api/v1/group/0/message';
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
  it('should return message object when a signed in user request for messages for an existing group', (done) => {
    const url = `/api/v1/group/${groupId}/messages`;
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Message Retrival Successful');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user request for messages for non existing group', (done) => {
    const url = '/api/v1/group/0/messages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('No Message For that Group');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user request for messages for non existing group', (done) => {
    api.get('/api/v1/group/uiy/messages')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message).toEqual('Invalid Group Selected');
          done(err);
        });
  }, 3000);
  it('should return user object then a signed in user requests for members of an existing group', (done) => {
    const url = `/api/v1/group/${groupId}/users`;
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Users Retrival Successful');
          expect(JSON.parse(res.text).users.length).toBeGreaterThan(0);
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user request for members of non existing group', (done) => {
    const url = '/api/v1/group/0/users';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(JSON.parse(res.text).message).toEqual('No Such Group');
          done(err);
        });
  }, 3000);
  it('should return group object when a signed in user request for his groups', (done) => {
    const url = '/api/v1/user/groups';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).groups).toEqual('object');
          expect(JSON.parse(res.text).groups.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).groups[0].groupName).toEqual('Camper');
          done(err);
        });
  }, 3000);
  it('should return message object when a signed in user request for his personal messages', (done) => {
    const url = '/api/v1/user/messages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).messages).toEqual('object');
          expect(JSON.parse(res.text).messages.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).messages[0].message).toEqual('How are you');
          done(err);
        });
  }, 3000);

  it('should return message object When a signed in user request for his archived messages', (done) => {
    const url = '/api/v1/user/messages/archived';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text)).toEqual('object');
          expect(JSON.parse(res.text).message).toEqual('Read Messages');
          done(err);
        });
  }, 3000);
});
afterAll((done) => {
  user.clearTables(() => {
  });
  done();
}, 1000);
