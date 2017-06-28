import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import img from './img/img.jpg';

class Index extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <img src={img} className="responsive-img" alt="Here" />
        </div>
        <SignUp />
        <LogIn />
      </div>
    );
  }
}

export default Index;
