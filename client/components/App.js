import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import SignUp from './SignUp';
import LogIn from './LogIn';
import NavBar from './NavBar';
import CreateMessage from './CreateMessage';
import CreateGroup from './CreateGroup';
import MessageBoard from './MessageBoard';
import Footer from './Footer';
import img from './img/img.jpg';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <img src={img} className="responsive-img" alt="Here" />
        </div>
        <SignUp />
        <LogIn />
        <CreateMessage />
        <CreateGroup />
        <MessageBoard />
        <Footer />
      </div>
    );
  }
}

export default App;
