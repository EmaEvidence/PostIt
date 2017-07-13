import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateMessage from './CreateMessage';
import CreateGroup from './CreateGroup';
import MessageBoard from './MessageBoard';
import Index from './Index';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/createmessage" component={CreateMessage} />
          <Route path="/creategroup" component={CreateGroup} />
          <Route path="/messageboard" component={MessageBoard} />
        </Switch>
      </div>
    );
  }
}

export default App;
