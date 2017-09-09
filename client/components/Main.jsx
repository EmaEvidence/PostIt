import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MessageBoard from './MessageBoard';
import NewPassword from './NewPassword';
import Index from './Index';
import NotFound from './NotFound';

/**
 * App controls routing in the App
 * @method App
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
const App = () => {
  const token = window.localStorage.getItem('token');
  let messageBoardBody;
  if (token) {
    messageBoardBody = MessageBoard;
  } else {
    messageBoardBody = Index;
  }
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/messageboard" component={messageBoardBody} />
        <Route path="/newpassword" component={NewPassword} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
