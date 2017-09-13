import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import setCurrentMessagesAction from '../../actions/setCurrentMessagesAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should retrive messages for a group in when the action is called', (done) => {
    moxios.stubRequest('/api/v1/group/1/messages', {
      status: 200,
      response: {
        messages: [{ id: 1, message: 'When' }, { id: 1, message: 'When' }],
        message: 'Message Retrived successfully'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ messages: [{ id: 1, message: 'When' }, { id: 1, message: 'When' }],
      type: types.SET_CURRENT_MESSAGES,
      status: 'Message Retrived successfully',
      groupName: 'Andela'
    }];
    store.dispatch(setCurrentMessagesAction({ groupName: 'Andela', data: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called', (done) => {
    moxios.stubRequest('/api/v1/group/1/messages', {
      status: 400,
      response: {
        messages: [],
        message: 'Username can not be empty'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ messages: [{ id: 1, message: 'When' }, { id: 1, message: 'When' }],
      type: types.SET_CURRENT_MESSAGES_ERROR,
      status: 'Message Retrival Failed',
      groupName: 'Andela'
    }];
    store.dispatch(setCurrentMessagesAction({ groupName: 'Andela', data: '' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
