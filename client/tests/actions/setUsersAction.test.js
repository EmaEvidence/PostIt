import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import setUsersAction from '../../actions/setUsersAction';
import SET_USERS from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://localhost:3300')
      .get('/api/user/all')
      .reply(200, { body: { data: [{}, {}] } });

    const expectedActions = [
      { types: SET_USERS }
    ];
    const store = mockStore({ todos: [] });
    return store.dispatch(setUsersAction('', '', () => {
      expect(store.getActions()).toEqual(expectedActions);
    }));
  });
});
