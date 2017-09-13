import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import setCurrentMembersAction from '../../actions/setCurrentMembersAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should retrive messages for a group in when the action is called', (done) => {
    moxios.stubRequest('/api/v1/group/1/users', {
      status: 200,
      response: {
        users: [{ id: 1, username: 'Evi' }, { id: 2, message: 'Evide' }],
        message: 'Members Retrived successfully'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ messages: [{ id: 1, message: 'When' }, { id: 1, message: 'When' }],
      type: types.SET_CURRENT_MEMBERS,
      status: 'Member Retrived successfully',
      groupName: 'Andela'
    }];
    store.dispatch(setCurrentMembersAction({ groupName: 'Andela', data: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should return error if data is invalid when the action is called', (done) => {
    moxios.stubRequest('/api/v1/group/1/users', {
      status: 400,
      response: {
        users: [],
        message: 'Member Retrival Failed'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ messages: [{ id: 1, message: 'When' }, { id: 1, message: 'When' }],
      type: types.SET_CURRENT_MEMBERS_ERROR,
      status: 'Member Retrival Failed',
      groupName: 'Andela'
    }];
    store.dispatch(setCurrentMembersAction({ groupName: 'Andela', data: '' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
