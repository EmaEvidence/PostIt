import axios from 'axios';

export default function userSignupRequest(userData) {
  return dispatch => {
    axios.post('https://postit-api.herokuapp.com/api/user/signup', userData)
  .then((response) => {
    console.log('-----------sucess-----------------');
    console.log(response);
    return (response);
  })
  .catch((error) => {
    console.log('-----------error----------------');
    console.log(error);
    return (error);
  });
  };
}
