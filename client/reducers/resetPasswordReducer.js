/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={status: ''}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  status: '',
}, action) {
  switch (action.type) {
    case 'RESET_MAIL_SUCCESS': {
      return Object.assign({}, state, {
        status: action.status,
      });
    }
    case 'RESET_MAIL_ERROR': {
      return Object.assign({}, state, {
        status: action.status
      });
    }
    case 'RESET_PASSWORD_SUCCESS': {
      return Object.assign({}, state, {
        status: action.status
      });
    }
    case 'RESET_PASSWORD_ERROR': {
      return Object.assign({}, state, {
        status: action.status
      });
    }
    default:
      return state;
  }
}
