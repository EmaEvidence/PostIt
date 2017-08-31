import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateMessage from './CreateMessage';
import CreateGroup from './CreateGroup';
import MessageBoard from './MessageBoard';
import NewPassword from './NewPassword';
import Index from './Index';
import NotFound from './NotFound';
/**
 * [App ]
 * @type {[type]}
 */
class App extends React.Component {
  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    const token = localStorage.getItem('token');
    let creatMessageBody;
    let createGroupBody;
    let messageBoardBody;
    if (token) {
      creatMessageBody = CreateMessage;
      messageBoardBody = MessageBoard;
      createGroupBody = CreateGroup;
    } else {
      creatMessageBody = Index;
      messageBoardBody = Index;
      createGroupBody = Index;
    }
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/createmessage" component={creatMessageBody} />
          <Route path="/creategroup" component={createGroupBody} />
          <Route path="/messageboard" component={messageBoardBody} />
          <Route path="/newpassword" component={NewPassword} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
