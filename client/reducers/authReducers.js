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
  user_details: {},
  auth_message: ''
}, action) {
  switch (action.type) {
    case 'ADD_USER_DETAILS': {
      return { ...state,
        logged_in: true,
        user_details: action.data,
        auth_message: 'Successful'
      };
    }
    case 'ADD_USER_DETAILS_ERROR': {
      return { ...state,
        logged_in: false,
        auth_message: action.data
      };
    }
    default:
      return state;
  }
}
