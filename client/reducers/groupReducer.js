/**
 * groupReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
 const groupReducer = (state = {
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
     case 'ADD_NEW_MEMBER': {
       const newState = { ...state };
       const filtered = newState.groups[0].find(group =>
         group.id === action.group.id);
       const newformed = { ...filtered, ...{ Users: [...filtered.Users, ...action.group.Users] } };
       const groups = newState.groups[0].map((group) => {
         return group.id === newformed.id ? newformed : group;
       });
       return { ...state, ...{ groups: [groups] } };
     }
     default:
       return state;
   }
 };

 export default groupReducer;
