import expect from 'expect';
import reducer from '../../reducers/archivedMessageReducer';
import * as types from '../../actions/types/types';

describe('archived messages reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      archivedMessages: [],
      currentGroup: '',
      status: ''
    });
  });
  it('it should handle GET_ARCHIVED_MESSAGES', () => {
    expect(reducer({
      archivedMessages: [],
      currentGroup: '',
      status: ''
    }, {
      type: types.GET_ARCHIVED_MESSAGES,
      messages: [{}]
    }))
    .toEqual({
      archivedMessages: [], currentGroup: '', status: ''
    });
  });
});
