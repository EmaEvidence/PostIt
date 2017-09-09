// import expect from 'expect';
// import supertest from 'supertest';
// import User from '../src/user';
// import app from '../server';
//
// const user = new User();
// const api = new supertest(app);
// let newUserId;

// describe('When a User makes a request to the APIs', () => {
//   it('should return status code 200', (done) => {
//     api.get('/')
//           .send({
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(200);
//             done(err);
//           });
//   }, 10000);
  // it('should return status code 400 if name is not sent to /api/v1/user/signup', (done) => {
  //   api.post('/api/v1/user/signup')
  //         .send({
  //           password: 'qwerty123@'
  //         })
  //         .end((err, res) => {
  //           expect(res.status).toEqual(400);
  //           expect(JSON.parse(res.text).message).toEqual('name cannot be null');
  //           done(err);
  //         });
  // }, 10000);
  //
  // it('should return status code 400 if email is not sent to /api/v1/user/signup', (done) => {
  //   api.post('/api/v1/user/signup')
  //         .send({
  //           password: 'qwerty123@',
  //           name: 'Ema Alabi',
  //           username: 'Evidence'
  //         })
  //         .end((err, res) => {
  //           expect(res.status).toEqual(400);
  //           expect(JSON.parse(res.text).message).toEqual('email cannot be null');
  //           done(err);
  //         });
  // }, 10000);
  //
  // it('should return user object if all parameter is sent to "/api/v1/user/signup"', (done) => {
  //   api.post('/api/v1/user/signup')
  //         .send({
  //           password: 'qwerty123@',
  //           name: 'Ema Alabi',
  //           username: 'Evi',
  //           phone: '07063747160',
  //           email: 'emmanuel@gmail.com'
  //         })
  //         .end((err, res) => {
  //           expect(res.status).toEqual(201);
  //           const response = JSON.parse(res.text);
  //           expect(response.message).toEqual('Registration Successful');
  //           expect(response.user.username).toEqual('Evi');
  //           expect(response.user.email).toEqual('emmanuel@gmail.com');
  //           expect(response.user.phone).toEqual('0706374710');
  //           done(err);
  //         });
  // }, 10000);
  // afterEach((done) => {
  //   user.deleteUserss('emmanuel@gmail.com', () => {
  //   });
  //   done();
  // }, 1000);
  //
  // it('should return status code 401 When a user access "/api/v1/group" without logging in', (done) => {
  //   api.post('/api/v1/group')
  //           .send({
  //           })
  //           .end((err, res) => {
  //             expect(res.status).toEqual(401);
  //             const response = JSON.parse(res.text);
  //             expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
  //             done(err);
  //           });
  // }, 10000);
  //
  // it('should return code 401 When a user access "/api/v1/group/3/user" without logging in', (done) => {
  //   api.post('/api/v1/group/3/user')
  //           .send({
  //           })
  //           .end((err, res) => {
  //             expect(res.status).toEqual(401);
  //             const response = JSON.parse(res.text);
  //             expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
  //             done(err);
  //           });
  // }, 10000);
  //
  // it('should return code 401 When a user access "/api/v1/group/1/message" without logging in', (done) => {
  //   api.post('/api/v1/group/1/message')
  //           .send({
  //           })
  //           .end((err, res) => {
  //             expect(res.status).toEqual(401);
  //             const response = JSON.parse(res.text);
  //             expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
  //             done(err);
  //           });
  // }, 10000);
  //
  // it('should return code 401 When a user access "/api/v1/group/eewewe/messages" without logging in', (done) => {
  //   api.get('/api/v1/group/eewewe/messages')
  //           .send({
  //           })
  //           .end((err, res) => {
  //             expect(res.status).toEqual(401);
  //             expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
  //             done(err);
  //           });
  // }, 10000);
  // it('should return status code 401 When a user access "/api/v1/user/groups" without logging in', (done) => {
  //   api.get('/api/v1/user/groups')
  //           .send({
  //           })
  //           .end((err, res) => {
  //             expect(res.status).toEqual(401);
  //             expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
  //             done(err);
  //           });
  // }, 10000);
  // it('should return status code 401 When a user access "/api/v1/user/groups" without logging in', (done) => {
  //   api.post('/api/v1/user/message/read')
  //           .send({
  //           })
  //           .end((err, res) => {
  //             expect(res.status).toEqual(401);
  //             expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
  //             done(err);
  //           });
  // }, 10000);
// });

// describe('when a user makes a request to the APIs', () => {
//   let token;
//   let signedInId;
//   it('should return status code 201 When a new user signs up', (done) => {
//     api.post('/api/v1/user/signup')
//           .send({
//             name: 'Samuel Oke',
//             username: 'Sammy',
//             email: 'sammy@gmail.com',
//             password: 'qwerty123@',
//             phone: '07063747160'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(201);
//             expect(JSON.parse(res.text).user.username).toEqual('Sammy');
//             done(err);
//           });
//   }, 3000);
//   it('should return status code 200 When a user signin', (done) => {
//     api.post('/api/v1/user/signin')
//           .send({
//             username: 'Sammy',
//             password: 'qwerty123@'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(200);
//             expect(JSON.parse(res.text).user.username).toEqual('Sammy');
//             expect(JSON.parse(res.text).user.email).toEqual('sammy@gmail.com');
//             expect(JSON.parse(res.text).user.name).toEqual('Samuel Oke');
//             token = JSON.parse(res.text).user.token;
//             signedInId = JSON.parse(res.text).user.id;
//             done(err);
//           });
//   }, 3000);
//   it('should return status code 400 When a user signs in with invalid username', (done) => {
//     api.post('/api/v1/user/signin')
//           .send({
//             username: '',
//             password: 'qwerty123@'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(400);
//             expect(JSON.parse(res.text).message).toEqual('Username can not be empty');
//             done(err);
//           });
//   }, 3000);
//   it('should return status code 400 When a user signs in with invalid password', (done) => {
//     api.post('/api/v1/user/signin')
//           .send({
//             username: 'Sammy',
//             password: 'qwqwqwqwqwqw'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(400);
//             expect(JSON.parse(res.text).message).toEqual('Failed, Wrong Password');
//             done(err);
//           });
//   }, 3000);
//   it('should return 200 and sucess message When a signed in user request for Other users', (done) => {
//     const url = '/api/v1/user/all';
//     api.get(url)
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(typeof JSON.parse(res.text).users).toEqual('object');
//           expect((JSON.parse(res.text).users).length).toBeGreaterThan(0);
//           expect(JSON.parse(res.text).users[0].username).toEqual('Sammy');
//           done(err);
//         });
//   }, 3000);
//   it('should return 200 and messages When a signed in user request for his groups', (done) => {
//     const url = '/api/v1/user/groups';
//     api.get(url)
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(typeof JSON.parse(res.text).groups).toEqual('object');
//           expect(JSON.parse(res.text).groups.length).toBeGreaterThan(0);
//           expect(JSON.parse(res.text).groups[0].groupName).toEqual('Camper');
//           done(err);
//         });
//   }, 3000);
//   it('should return 200 and messages When a signed in user request for his personal messages', (done) => {
//     const url = '/api/v1/user/messages';
//     api.get(url)
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(typeof JSON.parse(res.text).messages).toEqual('object');
//           expect(JSON.parse(res.text).messages.length).toBeGreaterThan(0);
//           expect(JSON.parse(res.text).messages[0].message).toEqual('How are you');
//           done(err);
//         });
//   }, 3000);
//
//   it('should return 200 and messages When a signed in user request for his archived messages', (done) => {
//     const url = '/api/v1/user/messages/archived';
//     api.get(url)
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(typeof JSON.parse(res.text)).toEqual('object');
//           expect(JSON.parse(res.text).message).toEqual('Read Messages');
//           done(err);
//         });
//   }, 3000);
//
//   it('should return 404 and Error message When an unregister user requests for password reset', (done) => {
//     const url = '/api/v1/user/forgetpassword';
//     api.post(url)
//         .send({
//           email: 'emaa@gmail.com'
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(404);
//           expect(JSON.parse(res.text).message).toEqual('Email Address Not found');
//           done(err);
//         });
//   }, 3000);
//
//   it('should return 200 and success message When a register user request for password reset', (done) => {
//     const url = '/api/v1/user/forgetpassword';
//     api.post(url)
//         .send({
//           email: 'sammy@gmail.com'
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(JSON.parse(res.text).message).toEqual('A mail has being sent to you.');
//           done(err);
//         });
//   }, 3000);
//
//   it('should return 200 and success message When a register user supplies password for reset', (done) => {
//     const url = '/api/v1/user/newpassword';
//     api.post(url)
//         .send({
//           userKey: 'sammy@gmail.com',
//           newpassword: 'qwerty123@',
//           password: 'qwerty123@'
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(JSON.parse(res.text).message).toEqual('Password Updated, please sign In with the new Password');
//           done(err);
//         });
//   }, 3000);
//   it('should return 400 and success message When a register user request for password reset with unsecure password', (done) => {
//     const url = '/api/v1/user/newpassword';
//     api.post(url)
//         .send({
//           userKey: 'sammy@gmail.com',
//           newpassword: 'qwerty',
//           password: 'qwerty'
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(400);
//           expect(JSON.parse(res.text).message).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
//           done(err);
//         });
//   }, 3000);
//   it('should return 400 and Error message When a register user request for password reset but password does not match', (done) => {
//     const url = '/api/v1/user/newpassword';
//     api.post(url)
//         .send({
//           email: 'sammy@gmail.com',
//           newpassword: 'qwerty123@',
//           password: 'qwerty12@3'
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(400);
//           expect(JSON.parse(res.text).message).toEqual('Invalid Input Supplied.');
//           done(err);
//         });
//   }, 3000);
//   it('should return 400 and error message When a register user searches for other users but searchTerm missing', (done) => {
//     const url = '/api/v1/users/search';
//     api.post(url)
//         .set('authorization', token)
//         .send({
//           search: 'dean'
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(400);
//           expect(JSON.parse(res.text).message).toEqual('Please supply a search term');
//           done(err);
//         });
//   }, 3000);
//   it('should return 200 and success message When a register user searches for other users', (done) => {
//     const url = '/api/v1/users/search';
//     api.post(url)
//         .set('authorization', token)
//         .send({
//           searchTerm: 'Sam',
//           offset: 0,
//           groupId
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(JSON.parse(res.text).message).toEqual('Search Result');
//           expect(JSON.parse(res.text).users[0].username).toEqual('Sammy');
//           expect(JSON.parse(res.text).count).toEqual(1);
//           done(err);
//         });
//   }, 3000);
//   xit('should return 404 and error message When a register user accesses no message', (done) => {
//     const url = '/api/v1/user/message/read';
//     api.post(url)
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.status).toEqual(404);
//           expect(JSON.parse(res.text).message).toEqual('No message Specified');
//           done(err);
//         });
//   }, 3000);
//   xit('should return 500 and error message When a register user supplies wrong messageId as read', (done) => {
//     const url = '/api/v1/user/message/read';
//     api.post(url)
//         .set('authorization', token)
//         .send({
//           messageId: 1
//         })
//         .end((err, res) => {
//           expect(res.status).toEqual(500);
//           expect(JSON.parse(res.text).message).toEqual('Error Reading Message');
//           done(err);
//         });
//   }, 3000);
//   xit('should return 200 and success message When a register user deletes his account', (done) => {
//     const url = '/api/v1//delete';
//     api.post(url)
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.status).toEqual(200);
//           expect(JSON.parse(res.text).message).toEqual('Deleted');
//           done(err);
//         });
//   }, 3000);
// });
//
// describe('When a User signs up with google+', () => {
//   it('should return status code 200 if the user has a google account', (done) => {
//     api.post('/api/v1/user/google')
//           .send({
//             name: 'ema alabi',
//             email: 'emaala@gmail.com',
//             state: 'Sign Up'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(200);
//             done(err);
//           });
//   }, 10000);
//   it('should return status code 400 if the user has an account already', (done) => {
//     api.post('/api/v1/user/google')
//           .send({
//             name: 'ema alabi',
//             email: 'sammy@gmail.com',
//             state: 'Sign Up'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(400);
//             done(err);
//           });
//   }, 10000);
// });
// describe('When a User signs in with google+', () => {
//   it('should return status code 200 if the user has a google account', (done) => {
//     api.post('/api/v1/user/google')
//           .send({
//             name: 'ema alabi',
//             email: 'emaala@gmail.com',
//             state: 'Sign In'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(200);
//             done(err);
//           });
//   }, 10000);
//   it('should return status code 400 if the user is not registered with google+', (done) => {
//     api.post('/api/v1/user/google')
//           .send({
//             name: 'ema alab',
//             email: 'emaal@gmail.com',
//             state: 'Sign In'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(400);
//             done(err);
//           });
//   }, 10000);
// });
//
// afterAll((done) => {
//   user.clearTables(() => {
//   });
//   done();
// }, 1000);
