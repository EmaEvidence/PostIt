import React from 'react';

class AllMessages extends React.Component {
  render() {
    const allMessages = this.props.messages;
    const Messagelist = allMessages.map((message, index) =>
      (
        <p
          key={index}
        >
          { message.message }
          <br />
          <i className="chip">From: {message.from}</i>
          <i className="chip">To: {message.to} </i>
          <i className="chip">{message.priority}</i>
          <i className="chip">{message.date}</i><br />
          <hr />
        </p>
    ));
    return (
      <div className="col-sm-7 deep-purple lighten-4 messagecard">
        <h2>Messages</h2>
        { Messagelist }
      </div>
    );
  }
}

export default AllMessages;
