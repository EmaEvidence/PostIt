import React from 'react';

class GroupMessages extends React.Component {
  render() {
    return (
      <div id="groupmessages" className="modal fade reg-form" role="dialog">
        <div className="modal-dialog">
          <h2> Group Messages </h2>
          <div className="messagecard">
            <p>
                fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
                jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
                jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
                jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk<br />
              <i className="chip">From: Emma.</i>
              <i className="chip">To: Group.</i>
              <i className="chip">Priority</i>
              <i className="chip">Date</i><br />
              <hr />
            </p>
            <p>
                fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
                jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
                jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
                jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk<br />
              <i className="chip">From: Emma.</i>
              <i className="chip">To: Group.</i>
              <i className="chip">Priority</i>
              <i className="chip">Date</i><br />
              <hr />
            </p>
          </div>
          <button
            type="button"
            className="form-control close custombutton"
            data-dismiss="modal"
          >Cancel</button>
        </div>
      </div>
    );
  }
}

export default GroupMessages;
