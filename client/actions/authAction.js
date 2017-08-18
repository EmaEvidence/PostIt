import { ADD_USER_DETAILS } from './types/types';


export default function authAction(data) {
  return {
    type: ADD_USER_DETAILS,
    data
  };
}
