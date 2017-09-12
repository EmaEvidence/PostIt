import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import createGroupAction from '../../actions/createGroupAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should sets users when the action is called', (done) => {
    moxios.stubRequest('/api/v1/group', {
      status: 200,
      response: {
        group: { id: 1, groupName: 'Walex' },
        message: 'Group Created successfully'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      group: { id: 1, groupName: 'Walex' },
      type: types.CREATE_GROUP,
      message: 'Group Created successfully'
    }];
    store.dispatch(createGroupAction({ groupName: 'Andela', users: [1, 3] })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should sets users when the action is called', (done) => {
    moxios.stubRequest('/api/v1/group', {
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
    store.dispatch(createGroupAction({ groupName: '', users: [1, 3] })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
