import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import passwordResetMailAction from '../../actions/passwordResetMailAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should return success when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/forgotpassword', {
      status: 200,
      response: {
        message: 'Mail Sent'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      message: 'Mail Sent',
      type: types.RESET_MAIL_SUCCESS
    }];
    store.dispatch(passwordResetMailAction({ email: 'ema@gmail.com' }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called',
  (done) => {
    moxios.stubRequest('/api/v1/group/1/message', {
      status: 404,
      response: {
        message: 'Email Not found'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [],
      type: types.RESET_MAIL_SUCCESS_ERROR,
      message: 'Email Not found'
    }];
    store.dispatch(passwordResetMailAction({ email: 'emag@gmail.com' }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
