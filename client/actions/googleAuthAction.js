import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';
// import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_ERROR } from './types/types';

export default function googleAuthAction(data) {
  console.log(data);
  const url = 'http://localhost:3300/api/v1/user/google';
  return (dispatch) => {
    axios.post(url, data)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      // dispatch({
      //   messages: res.data.messages,
      //   type: GOOGLE_AUTH_SUCCESS
      // });
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      window.location = '/messageboard';
    })
    .catch((err) => {
      // dispatch({
      //   message: 'Error Fetching Messa',
      //   type: GOOGLE_AUTH_ERROR
      // });
      if (err.response === undefined) {
        dispatch(authAction({
          data: 'Internal Error'
        }, 'Error'));
      } else {
        dispatch(authAction({
          data: err.response.data.message
        }, 'Error'));
      }
    });
  };
}
