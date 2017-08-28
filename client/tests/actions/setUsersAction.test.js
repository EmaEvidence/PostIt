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

  it('sets users when the action is called', () => {
    nock('http://localhost:3300')
      .get('/api/user/all')
      .reply(200, { body: { data: [{}, {}] } });
    const expectedActions = [
      { type: SET_USERS }
    ];
    const store = mockStore({}, expectedActions);
    store.dispatch(setUsersAction('', ''));
    store.dispatch(setUsersAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});


return (dispatch) => {
    return request.then( (data) => {
      dispatch({ type: FETCH_LISTINGS, payload: data });
    });
  }
