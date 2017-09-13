import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import clearNotificationAction from '../../actions/clearNotificationAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should clear Notification when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/notifications', {
      status: 200,
      response: {
        messages: [{ id: 1, message: 'Evi' }, { id: 2, mess: 'Evi' }],
        message: 'Notification cleared'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: { id: 1, username: 'Evi' },
      type: types.CLEAR_NOTIFICATION,
      status: 'Notification cleared',
    }];
    store.dispatch(clearNotificationAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/notifications', {
      status: 400,
      response: {
        messages: [{ id: 1, message: 'Evi' }, { id: 2, mess: 'Evi' }],
        message: 'Error clearing Notification'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: {},
      type: types.CLEAR_NOTIFICATION_ERROR,
      status: 'Error clearing Notification',
    }];
    store.dispatch(clearNotificationAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
