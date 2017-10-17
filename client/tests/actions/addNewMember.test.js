import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import addNewMemberAction from '../../actions/addNewMemberAction';
import * as types from '../../actions/types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should dispatch ADD_NEW_MEMBER action', (done) => {
    moxios.stubRequest('/api/v1/group/1/user', {
      status: 201,
      response: {
        user: { id: 1 },
        message: 'Added successfully'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      type: types.ADD_NEW_MEMBER,
      message: 'Added Sucessfully'
    }];
    store.dispatch(addNewMemberAction({ id: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
  it('should dispatch ADD_NEW_MEMBER_ERROR action', (done) => {
    moxios.stubRequest('/api/v1/group/1/user', {
      status: 400,
      response: {
        message: 'User already a member'
      }
    });
    const store = mockStore({});
    const expectedAction = [{
      message: 'User already a member',
      type: types.ADD_NEW_MEMBER_ERROR,
    }];
    store.dispatch(addNewMemberAction({ id: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
    done();
  });
});
