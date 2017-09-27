import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

const userSignInAction = userData => (dispatch) => {
  return axios.post('/api/v1/user/signin', userData)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      $('.modal').modal('close');
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch(authAction({
        data: res.data.user
      }, 'Successful'));
      location.href = '/messageboard';
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 2500, 'red white-text rounded');
      dispatch(authAction({
        data: err.response.data.message
      }, 'Error'));
    });
};

export default userSignInAction;
