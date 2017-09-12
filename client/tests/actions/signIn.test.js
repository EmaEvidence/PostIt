import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import userSignInRequest from '../../actions/userSignInAction';
import authAction from '../../actions/authAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should log a user in when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/signin', {
      status: 201,
      response: {
        user: { name: 'Evidence', username: 'Evidence', phone: '07073213443', email: 'ema@gg.com', token: '213123ddgdr23erwer' },
        message: 'Registration Successful'
      }
    });
    const store = mockStore({});
    const expectedAction = [authAction({
      data: { name: 'Evidence', username: 'Evidence', phone: '07073213443', email: 'ema@gg.com', token: '213123ddgdr23erwer' }
    }, 'Success')];
    store.dispatch(userSignInRequest({ userData: { username: 'Evidence', password: 'qwerty123@' } })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/signin', {
      status: 400,
      response: {
        user: {},
        message: 'Username can not be empty'
      }
    });
    const store = mockStore({});
    const expectedAction = [authAction({
      data: 'Internal Error'
    }, 'Error')];
    store.dispatch(userSignInRequest({ userData: { username: '', password: 'qwerty123@' } })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
