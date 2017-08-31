export default function reducer(state = {
  currentGroup: '',
  users: {},

}, action) {
  switch (action.type) {
    case 'SET_USERS': {
      return { ...state,
        currentGroup: action.currentGroup,
        users: action.users };
    }
    default:
      return state;
  }
}
