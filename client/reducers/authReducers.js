/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={                   logged_in: false] [description]
 * @param  {[type]} user_details [description]
 * @param  {[type]} action       [description]
 * @return {[type]}              [description]
 */
export default function reducer(state = {
  logged_in: false,
  user_details: {}
}, action) {
  switch (action.type) {
    case 'ADD_USER_DETAILS': {
      return Object.assign({}, state, {
        logged_in: true,
        user_details: action.data
      });
    }
    default:
      return state;
  }
}
