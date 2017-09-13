/**
 * reducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
 const reducer = (state = {
   status: '',
   groups: ''
 }, action) => {
   switch (action.type) {
     case 'CREATE_GROUP': {
       const newState = { ...state, status: action.message };
       newState.groups[0] = [...newState.groups[0], action.group];
       return newState;
     }
     case 'CREATE_GROUP_ERROR': {
       return { ...state, status: action.message };
     }
     case 'CLEAR_CREATE_GROUP_STATUS': {
       return { ...state, status: '' };
     }
     case 'ADD_USER_GROUPS': {
       return { ...state, status: '', groups: [...action.group] };
     }
     case 'ADD_USER_GROUPS_ERROR': {
       return { ...state, status: '', groups: [...action.group] };
     }
     default:
       return state;
   }
 };

 export default reducer;
