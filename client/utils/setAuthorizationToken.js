import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token) {
    window.localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    window.localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
