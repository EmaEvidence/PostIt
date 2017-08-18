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
