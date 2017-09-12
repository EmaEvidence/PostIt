import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import googleAuthAction from '../../actions/googleAuthAction';
import * as types from '../../actions/types/types';
import authAction from '../../actions/authAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should add a with google+ when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/google', {
      status: 200,
      response: {
        message: 'Message Read',
        messages: [{ id: 1, message: 'Evi', priority: 'Normal' }, { id: 2, message: 'Evi again', priority: 'Normal' }]
      }
    });
    const store = mockStore({});
    const expectedAction = [authAction({
      data: { name: 'Evidence', username: 'Evidence', phone: '07073213443', email: 'ema@gg.com', token: '213123ddgdr23erwer' }
    }, 'Success')];
    store.dispatch(googleAuthAction({ name: 'Evi Ema', email: 'ema@gmail.com', state: 'Sign Up' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/google', {
      status: 500,
      response: {
        message: 'Error Reading Message',
        messages: [{ id: 1, message: 'Evi', priority: 'Normal' }, { id: 2, message: 'Evi again', priority: 'Normal' }]
      }
    });
    const store = mockStore({});
    const expectedAction = [authAction({
      data: 'Internal Error'
    }, 'Error')];
    store.dispatch(googleAuthAction({ name: '', email: '', state: 'Sign Up' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
