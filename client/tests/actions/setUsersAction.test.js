import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import setUsersAction from '../../actions/setUsersAction';
import SET_USERS from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should sets users when the action is called', (done) => {
    moxios.stubRequest('/api/v1/user/all', {
      status: 200,
      response: {
        users: [{ id: 1 }, { id: 2 }]
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      currentGrou: { id: 1 },
      type: SET_USERS,
      users: [{ id: 1 }, { id: 2 }]
    }];
    store.dispatch(setUsersAction(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
