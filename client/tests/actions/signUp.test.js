import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import userSignUpAction from '../../actions/userSignUpAction';
import authAction from '../../actions/authAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should dispatch authAction', (done) => {
    moxios.stubRequest('/api/v1/user/signup', {
      status: 201,
      response: {
        user: {
          name: 'Evidence',
          username: 'Evidence',
          phone: '07073213443',
          email: 'ema@gg.com',
          token: '213123ddgdr23erwer' },
        message: 'Registration Successful'
      }
    });
    const store = mockStore({});
    const expectedAction = [authAction({
      data: {
        name: 'Evidence',
        username: 'Evidence',
        phone: '07073213443',
        email: 'ema@gg.com',
        token: '213123ddgdr23erwer' }
    }, 'Success')];
    store.dispatch(userSignUpAction({
      userData: {
        name: 'Evidence',
        username: 'Evidence',
        phone: '07073213443',
        email: 'ema@gg.com' } })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    done();
  });
  it('should dispatch authAction',
  (done) => {
    moxios.stubRequest('/api/v1/user/signup', {
      status: 400,
      response: {
        user: {},
        message: 'Name can not be undefined'
      }
    });
    const store = mockStore({});
    const expectedAction = [authAction({
      data: 'Internal Error'
    }, 'Error')];
    store.dispatch(userSignUpAction({
      userData: {
        name: '',
        username: '',
        phone: '07073213443',
        email: '',
        token: '213123ddgdr23erwer' } })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    done();
  });
});
