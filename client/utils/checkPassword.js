function checkPassword(password, cpassword) {
  if (password === cpassword) {
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
}

export default checkPassword;
