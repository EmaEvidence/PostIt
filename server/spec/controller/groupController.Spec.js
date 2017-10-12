import expect from 'expect';
import supertest from 'supertest';

import server from '../../server';

const api = new supertest(server);
let newUserId;

describe('When a User makes a request to the API', () => {
  it('should return error when "/api/v1/group" is accessed without logging in',
  (done) => {
    api.post('/api/v1/group')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              const response = JSON.parse(res.text);
              expect(response.message)
              .toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return error when "/api/v1/group/3/user" is accessed without logging in',
  (done) => {
    api.post('/api/v1/group/3/user')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              const response = JSON.parse(res.text);
              expect(response.message)
              .toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return error when a user access "/api/v1/group/1/message" without logging in',
  (done) => {
    api.post('/api/v1/group/1/message')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              const response = JSON.parse(res.text);
              expect(response.message)
              .toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);

  it('should return error when a user access "/api/v1/group/eewewe/messages" without logging in',
  (done) => {
    api.get('/api/v1/group/eewewe/messages')
            .send({
            })
            .end((err, res) => {
              expect(res.status).toEqual(401);
              expect(JSON.parse(res.text).message)
              .toEqual('Access Token Not Provided. Please Sign In');
              done(err);
            });
  }, 10000);
});
describe('when a user makes a request to the API', () => {
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
            if (JSON.parse(res.text).user === undefined) {
              api.post('/api/v1/user/signin')
                    .send({
                      username: 'Trial1',
                      password: 'qwerty123@'
                    })
                    .end((err, res) => {
                      token = JSON.parse(res.text).token;
                      signedInId = JSON.parse(res.text).user.id;
                      done();
                    }, 10000);
            } else {
              token = JSON.parse(res.text).token;
              signedInId = JSON.parse(res.text).user.id;
            }
            done();
          }, 10000);
  }, 10000);
  it('should return user object when a new user signs up', (done) => {
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
            expect(JSON.parse(res.text).user.email).toEqual('sammy@gmail.com');
            expect(JSON.parse(res.text).user.phone).toEqual('07063747160');
            expect(JSON.parse(res.text).user.name).toEqual('Samuel Oke');
            done(err);
          });
  }, 3000);
  let groupId;
  it('should return group object when a signed in user creates a group',
  (done) => {
    api.post('/api/v1/group')
          .set('authorization', token)
          .send({
            groupName: 'Camper',
            users: 'Trial1'
          })
          .end((err, res) => {
            expect(res.status).toEqual(201);
            expect(JSON.parse(res.text).group.groupName).toEqual('Camper');
            groupId = JSON.parse(res.text).group.id;
            done(err);
          });
  }, 3000);
  it('should return error when a signed in user sends invalid data when adding member',
  (done) => {
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
  it('should return message object when a signed in user posts to a group',
  (done) => {
    const url = `/api/v1/group/${groupId}/message`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: newUserId,
          message: 'How are you'
        })
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(JSON.parse(res.text).message).toEqual('Message Added.');
          expect(JSON.parse(res.text).messageData.message)
          .toEqual('How are you');
          done(err);
        });
  }, 3000);
  it('should return message object when a signed in user requests for his personal messages',
  (done) => {
    const url = '/api/v1/user/messages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).messages).toEqual('object');
          expect(JSON.parse(res.text).messages.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).messages[0].message)
          .toEqual('How are you');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user posts to a group with invalid data',
  (done) => {
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
          expect(JSON.parse(res.text).message)
          .toEqual('message cannot be empty');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user posts to a group with invalid data',
  (done) => {
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
          expect(JSON.parse(res.text).message)
          .toEqual('Please Select a Priority level');
          done(err);
        });
  }, 3000);
  let messageId;
  it('should return message object when a signed in user requests for messages for an existing group',
  (done) => {
    const url = `/api/v1/group/${groupId}/messages`;
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message)
          .toEqual('Message Retrival Successful');
          expect(JSON.parse(res.text).messages[0].message)
          .toEqual('How are you');
          messageId = JSON.parse(res.text).messages[0].id;
          done(err);
        });
  }, 3000);

  it('should mark a message as read', (done) => {
    api.post('/api/v1/user/message/read')
        .set('authorization', token)
        .send({
          messages: [{ id: messageId }]
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text)).toEqual('object');
          expect(JSON.parse(res.text).message).toEqual('Message Read');
          done(err);
        });
  }, 3000);

  it('should retrieve archived message as read', (done) => {
    api.get(`/api/v1/user/${groupId}/messages/archived`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text)).toEqual('object');
          expect(JSON.parse(res.text).messages[0].message)
          .toEqual('How are you');
          expect(JSON.parse(res.text).messages[0].priority)
          .toEqual('Normal');
          expect(JSON.parse(res.text).messages[0].senderUsername)
          .toEqual('Trial1');
          expect(JSON.parse(res.text).messages[0].groupId)
          .toEqual(groupId);
          expect(JSON.parse(res.text).message).toEqual('Archived Messages');
          done(err);
        });
  }, 3000);

  it('should return error when a signed in user requests for members of non existing group',
  (done) => {
    const url = '/api/v1/group/0/users';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(JSON.parse(res.text).message)
          .toEqual('You are not a member of this group');
          done(err);
        });
  }, 3000);
  it('should return group object when a signed in user requests for his groups',
  (done) => {
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
  it('should return message object when a signed in user requests for his personal messages',
  (done) => {
    const url = '/api/v1/user/messages';
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof JSON.parse(res.text).messages).toEqual('object');
          expect(JSON.parse(res.text).messages.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).messages[0].message)
          .toEqual('How are you');
          done(err);
        });
  }, 3000);

  it('should return array of users when a signed in user requests for members of an existing group',
  (done) => {
    const url = `/api/v1/group/${groupId}/users`;
    api.get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message)
          .toEqual('Users Retrival Successful');
          expect(JSON.parse(res.text).users.length).toBeGreaterThan(0);
          expect(JSON.parse(res.text).users[0].username).toEqual('Trial1');
          done(err);
        });
  }, 3000);
  it('should return error when a signed in user sends invalid data when adding member',
  (done) => {
    const url = `/api/v1/group/${groupId}/user`;
    api.post(url)
        .set('authorization', token)
        .send({
          user: '',
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(JSON.parse(res.text).message)
          .toEqual('User Id must be stated');
          done(err);
        });
  }, 6000);
});
