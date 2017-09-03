/**
 * checkPassword confirms if password supplied is the same
 * @method checkPassword
 *
 * @param  {string} password
 * @param  {string} confirmPassword
 *
 * @return {object} state new state
 */
const checkPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    this.setState({
      pwdmatch: 'password matches',
    });
    this.refs.submit.disabled = false;
  } else {
    this.setState({
      pwdmatch: 'password does not match',
    });
    this.refs.submit.disabled = true;
  }
};

export default checkPassword;
