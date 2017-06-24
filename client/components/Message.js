import React from 'react';

require('../scss/main.scss');

const Message = React.createClass({
  render: () => {
    return (
      <div>
        <h5> The timethe message came is {new Date().toLocaleTimeString()}</h5>
      </div>
    );
  }
});
export default Message;
