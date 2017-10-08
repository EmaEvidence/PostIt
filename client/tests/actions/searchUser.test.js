import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import searchUserAction from '../../actions/searchUserAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should retrive users when the action is called', (done) => {
    moxios.stubRequest('/api/v1/users/search', {
      status: 200,
      response: {
        users: [{ id: 1, username: 'Evi' }, { id: 2, message: 'Evide' }],
        message: 'Search Result'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [{ id: 1, message: 'When' },
    { id: 1, message: 'When' }],
      type: types.SEARCH_USER,
      status: 'Member Retrived successfully'
    }];
    store.dispatch(searchUserAction({
      searchTerm: 'ev', offset: 5, groupId: 1 })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    done();
  });
  it('should return error if data is invalid when the action is called',
  (done) => {
    moxios.stubRequest('/api/v1/users/search', {
      status: 400,
      response: {
        users: [],
        message: 'Search Failed'
      }
    });
    const store = mockStore({});
    const expectedAction = [{ users: [],
      type: types.SEARCH_USER_ERROR,
      status: 'Search Failed'
    }];
    store.dispatch(searchUserAction({ searchTerm: '', offset: 5, groupId: 1 }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
