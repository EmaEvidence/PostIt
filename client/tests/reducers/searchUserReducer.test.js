import expect from 'expect';
import reducer from '../../reducers/searchUserReducer';
import * as types from '../../actions/types/types';

describe('searchUser reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        status: '',
        searchResult: [],
        pageCount: 0
      }
    );
  });

  it('should handle SEARCH_USER', () => {
    expect(reducer({}, {
      type: types.SEARCH_USER,
      message: 'Search Result',
      users: [{}],
      count: 10
    })).toEqual(
      {
        status: 'Search Result',
        searchResult: [{}],
        pageCount: 2
      }
    );
  });
});
