import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getUserGroupsAction from '../../actions/getUserGroupsAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  xit('should sets users when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/groups', {
      status: 200,
      response: {
        group: [{ id: 1, groupName: 'Andela' }, { id: 2, groupName: 'Man' }],
        message: 'Message Retrived successfully'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      status: '',
      groups: [{ id: 1, groupName: 'Andela' }, { id: 2, groupName: 'Man' }]
    }];
    store.dispatch(getUserGroupsAction({ userId: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  xit('should sets users when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/groups', {
      status: 400,
      response: {
        message: 'Group Name can not be empty'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      message: 'Group Name can not be empty',
      type: types.CREATE_GROUP_ERROR,
    }];
    store.dispatch(getUserGroupsAction({ groupName: '', users: [1, 3] })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
