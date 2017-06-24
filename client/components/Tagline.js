import React from 'react';
import Message from './Message';

require('../scss/main.scss');

const Tagline = React.createClass({
  render: () => {
    return (
      <div>
        <Message />
        <h5> The time here now {new Date().toLocaleTimeString()}</h5>
      </div>
    );
  }
});
export default Tagline;
