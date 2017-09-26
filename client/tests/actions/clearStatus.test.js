import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';

import clearStatusAction from '../../actions/clearStatusAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('should clear status from store when the action is called', (done) => {
    const store = mockStore({});
    const expectedAction = [{
      message: '',
      type: types.CLEAR_SEARCH_USER_STATUS
    }];
    store.dispatch(clearStatusAction({ action: 'searchUser' })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
