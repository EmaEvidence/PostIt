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
      return { ...state, status: action.message };
    }
    case 'POST_MESSAGE_ERROR': {
      return { ...state, status: action.message };
    }
    case 'CLEAR_POST_MESSAGE_STATUS': {
      return { ...state, status: '' };
    }
    default:
      return state;
  }
}
