import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import resetPasswordAction from '../../actions/resetPasswordAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should return an action to reset password when the action is called',
  (done) => {
    moxios.stubRequest('/api/v1/user/newpassword', {
      status: 200,
      response: {
        users: { id: 1, username: 'Evi' },
        message: 'Password Reset successful'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: { id: 1, username: 'Evi' },
      type: types.RESET_PASSWORD_SUCCESS,
      status: 'Password Reset successful',
    }];
    store.dispatch(resetPasswordAction({ newPassword: 'ev', userKey: 1 }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if invalid data is called with the action',
  (done) => {
    moxios.stubRequest('/api/v1/users/search', {
      status: 400,
      response: {
        users: [],
        message: 'Search Failed'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: {},
      type: types.RESET_PASSWORD_ERROR,
      status: 'Password Reset failed',
    }];
    store.dispatch(resetPasswordAction({ newPassword: '', userKey: 1 }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
