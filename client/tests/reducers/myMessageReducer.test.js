import expect from 'expect';
import reducer from '../../reducers/myMessageReducer';
import * as types from '../../actions/types/types';

describe('my message reducer', () => {
  it('it should return inital state', () => {
    expect(reducer(undefined, {})).toEqual({
      myMessages: []
    });
  });

  it('should handle GET_MY_MESSAGES', () => {
    expect(reducer({}, {
      type: types.GET_MY_MESSAGES,
      messages: [{}]
    })).toEqual({
      myMessages: [{}]
    });
  });
});
