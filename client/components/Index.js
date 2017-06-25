import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import NavBar from './NavBar';

class Index extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <LogIn />
        <SignUp />
      </div>
    );
  }
}

export default Index;
