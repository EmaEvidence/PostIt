import expect from 'expect';
import reducer from '../../reducers/archivedMessagesReducer';
import * as types from '../../actions/types/types';

describe('archived messages reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      archivedMessages: []
    });
  });
  it('it should handle GET_ARCHIVED_MESSAGES', () => {
    expect(reducer({}, {
      type: types.GET_ARCHIVED_MESSAGES,
      messages: [{}]
    }))
    .toEqual({
      myMessages: [{}]
    });
  });
});
