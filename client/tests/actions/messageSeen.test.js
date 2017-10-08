import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import messageSeenAction from '../../actions/messageSeenAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should return success when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/message/read', {
      status: 200,
      response: {
        message: 'Message Read',
        messages: [{
          id: 1,
          message: 'Evi',
          priority: 'Normal' },
          { id: 2, message: 'Evi again', priority: 'Normal' }]
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      message: 'Message Read',
      type: types.GET_MY_MESSAGES
    }];
    store.dispatch(messageSeenAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called',
  (done) => {
    moxios.stubRequest('/api/v1/user/messages', {
      status: 500,
      response: {
        message: 'Error Reading Message',
        messages: [{
          id: 1,
          message: 'Evi',
          priority: 'Normal' },
          { id: 2, message: 'Evi again', priority: 'Normal' }]
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [],
      type: types.GET_MY_MESSAGES_ERROR,
      message: 'Error Reading Message'
    }];
    store.dispatch(messageSeenAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
