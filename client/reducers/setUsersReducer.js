export default function reducer(state = {
  current_group: '',
  users: {},

}, action) {
  switch (action.type) {
    case 'SET_USERS': {
      return { ...state,
        current_group: action.current_group,
        users: action.users };
    }
    default:
      return state;
  }
}
