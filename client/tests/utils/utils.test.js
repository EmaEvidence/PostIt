import axios from 'axios';
import expect from 'expect';

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import checkPassword from '../../utils/checkPassword';


describe('setAuthorizationToken', () => {
  it('should set token in the headers', (done) => {
    const token = 'qwertyu1234567889666';
    setAuthorizationToken(token);
    expect(axios.defaults.headers.common.token).toEqual(token);
    done();
  });
  it('remove header if token is not set', (done) => {
    setAuthorizationToken();
    expect(axios.defaults.headers.common.token).toEqual('');
    done();
  });
});

describe('checkPassword', () => {
  it('should return password matches if password matches', (done) => {
    checkPassword('12345', '12345');
    expect(axios.defaults.headers.common.token).toEqual('password matches');
    done();
  });
  it('should return password does matches if password does not matches', (done) => {
    checkPassword('12345', 54321);
    expect(axios.defaults.headers.common.token).toEqual('password does not match');
    done();
  });
});
