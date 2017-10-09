import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import myMessageAction from '../../actions/myMessageAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should return success when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/messages', {
      status: 200,
      response: {
        message: 'Message Retrival Succesful',
        messages: [{
          id: 1,
          message: 'Evi',
          priority: 'Normal' },
          { id: 2, message: 'Evi again', priority: 'Normal' }]
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      message: 'Mail Sent',
      type: types.GET_MY_MESSAGES
    }];
    store.dispatch(myMessageAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/messages', {
      status: 404,
      response: {
        message: 'Message Retrival failed',
        messages: {}
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [],
      type: types.GET_MY_MESSAGES_ERROR,
      message: 'Message Retrival failed'
    }];
    store.dispatch(myMessageAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
