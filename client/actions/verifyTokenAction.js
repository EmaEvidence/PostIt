import axios from 'axios';

const verifyTokenAction = (token) => {
  return axios.post('/api/v1/user/verify', { token });
};

export default verifyTokenAction;
