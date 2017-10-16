import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import getUsersAction from '../../actions/getUsersAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should dispatch GET_USERS action', (done) => {
    moxios.stubRequest('/api/v1/user/all', {
      status: 200,
      response: {
        users: [{ id: 1, name: 'Evi Evi', username: 'Evi' },
        { id: 1, name: 'Evi Evi', username: 'Evi' }],
        message: 'User Retrived'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ messages: { message: 'Evi', priority: 'Normal' },
      users: [{ id: 1, name: 'Evi Evi', username: 'Evi' },
      { id: 1, name: 'Evi Evi', username: 'Evi' }],
      type: types.GET_USERS
    }];
    store.dispatch(getUsersAction()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
