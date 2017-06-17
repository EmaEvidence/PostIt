import expect from 'expect';
import User from '../src/post';

const user = new User();
console.log(111111);
const username = 'Emmma';
const name = 'Emmma Alabi';
const email = 'emmmaalabi@gmail.com';
const password = '1234567';
let result;
user.signUp(name, username, email, password, (result1) => {
  console.log(result1);
  result = result1;
});
console.log(result);

describe('When a new User signs up', () => {
  it('should return true for valid JSON ', () => {
    expect(() => { user.signUp(name, username, email, password, (result) => {}); }).toBe(true);
  });
});
