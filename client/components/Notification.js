import React from 'react';

class Notification extends React.Component {
  render() {
    return (
      <div id="notifications" className="modal fade reg-form">
        <h2> Notifications </h2>
        <div className="messagecard">
          <p>
            emmanuel Alabi sent a message to Cohort 28
            <hr />
          </p>
          <p>
            Ayo Ade sent a message to Family
            <hr />
          </p>
        </div>
        <button
          type="button"
          className="form-control deep-purple lighten-4 modal-close custombutton"
          data-dismiss="modal"
        >
        Cancel</button>
      </div>
    );
  }
}

export default Notification;
