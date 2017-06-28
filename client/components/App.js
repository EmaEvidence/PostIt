import React from 'react';
import NavBar from './NavBar';
import CreateMessage from './CreateMessage';
import CreateGroup from './CreateGroup';
import MessageBoard from './MessageBoard';
import Footer from './Footer';
import Index from './Index';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Index />
        <CreateMessage />
        <CreateGroup />
        <MessageBoard />
        <Footer />
      </div>
    );
  }
}

export default App;
