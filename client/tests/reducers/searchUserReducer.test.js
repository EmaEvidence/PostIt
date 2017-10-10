import expect from 'expect';
import searchUserReducer from '../../reducers/searchUserReducer';
import * as types from '../../actions/types/types';

describe('searchUser reducer', () => {
  it('should return the initial state', () => {
    expect(searchUserReducer(undefined, {})).toEqual(
      {
        status: '',
        searchResult: [],
        pageCount: 0
      }
    );
  });

  it('should handle SEARCH_USER', () => {
    expect(searchUserReducer({}, {
      type: types.SEARCH_USER,
      message: 'Search Result',
      users: [{ id: 1,
        name: 'Evi Ade',
        createdAt: '12/1/2017',
        username: 'Evidence'
      }, { id: 1,
        name: 'Ema Eva',
        createdAt: '12/1/2017',
        username: 'Eva'
      }],
      count: 2
    })).toEqual(
      {
        status: 'Search Result',
        searchResult: [{ id: 1,
          name: 'Evi Ade',
          createdAt: '12/1/2017',
          username: 'Evidence'
        }, { id: 1,
          name: 'Ema Eva',
          createdAt: '12/1/2017',
          username: 'Eva'
        }],
        pageCount: 1
      }
    );
  });

  it('should handle SEARCH_USER_ERROR', () => {
    expect(searchUserReducer({}, {
      type: types.SEARCH_USER_ERROR,
      message: 'Nothing Found',
      users: [],
      count: 0
    })).toEqual(
      {
        status: 'Nothing Found',
      }
    );
  });

  it('should handle CLEAR_SEARCH_USER_STATUS', () => {
    expect(searchUserReducer({}, {
      type: types.CLEAR_SEARCH_USER_STATUS,
      message: 'Search Result',
      users: [{ id: 1,
        name: 'Evi Ade',
        createdAt: '12/1/2017',
        username: 'Evidence'
      }, { id: 1,
        name: 'Ema Eva',
        createdAt: '12/1/2017',
        username: 'Eva'
      }],
      count: 2
    })).toEqual(
      {
        status: '',
        searchResult: [],
        pageCount: 0
      }
    );
  });
});
