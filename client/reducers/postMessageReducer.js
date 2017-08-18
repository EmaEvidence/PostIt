/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={               status: ''}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  status: ''
}, action) {
  switch (action.type) {
    case 'POST_MESSAGE': {
      return Object.assign({}, state, {
        status: action.message
      });
    }
    case 'POST_MESSAGE_ERROR': {
      return Object.assign({}, state, {
        status: action.message
      });
    }
    default:
      return state;
  }
}
