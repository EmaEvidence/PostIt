// import expect from 'expect';
// import supertest from 'supertest';
// import User from '../../helpers/user';
// import app from '../../server';
//
// const user = new User();
// const api = new supertest(app);
// let newUserId;
//
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
//   it('should return status code 400 if name is not sent to /api/v1/user/signup', (done) => {
//     api.post('/api/v1/user/signup')
//           .send({
//             password: 'qwerty123@'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(400);
//             expect(JSON.parse(res.text).message).toEqual('name cannot be null');
//             done(err);
//           });
//   }, 10000);
//
//   it('should return status code 400 if email is not sent to /api/v1/user/signup', (done) => {
//     api.post('/api/v1/user/signup')
//           .send({
//             password: 'qwerty123@',
//             name: 'Ema Alabi',
//             username: 'Evidence'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(400);
//             expect(JSON.parse(res.text).message).toEqual('email cannot be null');
//             done(err);
//           });
//   }, 10000);
//
//   it('should return user object if all parameter is sent to "/api/v1/user/signup"', (done) => {
//     api.post('/api/v1/user/signup')
//           .send({
//             password: 'qwerty123@',
//             name: 'Ema Alabi',
//             username: 'Evi',
//             phone: '07063747160',
//             email: 'emmanuel@gmail.com'
//           })
//           .end((err, res) => {
//             expect(res.status).toEqual(201);
//             const response = JSON.parse(res.text);
//             expect(response.message).toEqual('Registration Successful');
//             expect(response.user.username).toEqual('Evi');
//             expect(response.user.email).toEqual('emmanuel@gmail.com');
//             expect(response.user.phone).toEqual('0706374710');
//             done(err);
//           });
//   }, 10000);
//   afterEach((done) => {
//     user.deleteUserss('emmanuel@gmail.com', () => {
//     });
//     done();
//   }, 1000);
//
//   it('should return status code 401 When a user access "/api/v1/group" without logging in', (done) => {
//     api.post('/api/v1/group')
//             .send({
//             })
//             .end((err, res) => {
//               expect(res.status).toEqual(401);
//               const response = JSON.parse(res.text);
//               expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
//               done(err);
//             });
//   }, 10000);
//
//   it('should return code 401 When a user access "/api/v1/group/3/user" without logging in', (done) => {
//     api.post('/api/v1/group/3/user')
//             .send({
//             })
//             .end((err, res) => {
//               expect(res.status).toEqual(401);
//               const response = JSON.parse(res.text);
//               expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
//               done(err);
//             });
//   }, 10000);
//
//   it('should return code 401 When a user access "/api/v1/group/1/message" without logging in', (done) => {
//     api.post('/api/v1/group/1/message')
//             .send({
//             })
//             .end((err, res) => {
//               expect(res.status).toEqual(401);
//               const response = JSON.parse(res.text);
//               expect(response.message).toEqual('Access Token Not Provided. Please Sign In');
//               done(err);
//             });
//   }, 10000);
//
//   it('should return code 401 When a user access "/api/v1/group/eewewe/messages" without logging in', (done) => {
//     api.get('/api/v1/group/eewewe/messages')
//             .send({
//             })
//             .end((err, res) => {
//               expect(res.status).toEqual(401);
//               expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
//               done(err);
//             });
//   }, 10000);
//   it('should return status code 401 When a user access "/api/v1/user/groups" without logging in', (done) => {
//     api.get('/api/v1/user/groups')
//             .send({
//             })
//             .end((err, res) => {
//               expect(res.status).toEqual(401);
//               expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
//               done(err);
//             });
//   }, 10000);
//   it('should return status code 401 When a user access "/api/v1/user/groups" without logging in', (done) => {
//     api.post('/api/v1/user/message/read')
//             .send({
//             })
//             .end((err, res) => {
//               expect(res.status).toEqual(401);
//               expect(JSON.parse(res.text).message).toEqual('Access Token Not Provided. Please Sign In');
//               done(err);
//             });
//   }, 10000);
// });
