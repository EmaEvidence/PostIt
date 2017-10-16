import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import postMessageAction from '../../actions/postMessageAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should dispatch POST_MESSAGE action when called', (done) => {
    moxios.stubRequest('/api/v1/group/1/message', {
      status: 200,
      response: {
        messageData: { id: 1, message: 'Evi', priority: 'Normal' },
        message: 'Message Sent'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ messages: { message: 'Evi', priority: 'Normal' },
      message: 'Message Sent',
      type: types.POST_MESSAGE
    }];
    store.dispatch(postMessageAction({ message: 'Evi', priority: 'Normal' }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should dispatch POST_MESSAGE_ERROR action if data is invalid',
  (done) => {
    moxios.stubRequest('/api/v1/group/1/message', {
      status: 400,
      response: {
        messageData: { message: '', priority: 'Normal' },
        message: 'Message can not be empty'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [],
      type: types.POST_MESSAGE_ERROR,
      message: 'Message can not be empty'
    }];
    store.dispatch(postMessageAction({ message: '', priority: 'Normal' }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called',
  (done) => {
    moxios.stubRequest('/api/v1/group//message', {
      status: 400,
      error: { response: {
        messageData: { message: 'Evi', priority: 'Normal' },
        message: 'Group Must be defined'
      } }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [],
      type: types.POST_MESSAGE_ERROR,
      status: 'Group Must be defined'
    }];
    store.dispatch(postMessageAction({ message: 'Evi', priority: 'Normal' }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
