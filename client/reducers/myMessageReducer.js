/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={               myMessages: []}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  myMessages: []
}, action) {
  switch (action.type) {
    case 'GET_MY_MESSAGES': {
      return Object.assign({}, state, {
        myMessages: [...action.messages]
      });
    }
    default:
      return state;
  }
}
