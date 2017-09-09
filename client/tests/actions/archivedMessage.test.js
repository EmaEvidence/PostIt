import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import archivedmessageAction from '../../actions/archivedMessageAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should retrieve archived messages when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/1/messages/archived', {
      status: 201,
      response: {
        messages: [{ id: 1, message: 'we' }, { id: 2, message: 'we' }],
        message: 'Message retrieved'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      type: types.GET_ARCHIVED_MESSAGE,
      status: 'Message retrieved',
      groupName: 'trial',
      messages: [{ id: 1, message: 'we' }, { id: 2, message: 'we' }],
    }];
    store.dispatch(archivedmessageAction({ groupId: 1, groupName: 'trial' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should retrieve archived messages when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/1/messages/archived', {
      status: 400,
      response: {
        messages: [{ id: 1, message: 'we' }, { id: 2, message: 'we' }],
        message: 'Failed to retrieved Message'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      type: types.GET_ARCHIVED_MESSAGE_ERROR,
      status: 'Message retrieved',
      groupName: 'trial',
      messages: [],
    }];
    store.dispatch(archivedmessageAction({ groupId: 1, groupName: 'trial' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
