import React from 'react';

class ArchiveMessages extends React.Component {
  render() {
    return (
      <div id="archivemessages" className="modal fade reg-form">
        <div className="modal-dialog">
          <h2> Archived Messages </h2>
          <div className="messagecard">
          <p>
              fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
              jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
              jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
              jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk<br />
            <i className="chip">Seen: 12.</i>
            <i className="chip">To: Group.</i>
            <i className="chip">Priority: Priority</i>
            <i className="chip">Date: Date</i><br />
            <i className="chip">Edit</i>
            <i className="chip">Delete</i><br />
            <hr />
          </p>
            <p>
              fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
              jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
              jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk
              jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk<br />
              <i className="chip">Seen: 12.</i>
              <i className="chip">To: Group.</i>
              <i className="chip">Priority: Priority</i>
              <i className="chip">Date: Date</i><br />
              <i className="chip">Edit</i>
              <i className="chip">Delete</i><br />
              <hr />
            </p>
          </div>
          <button
            type="button"
            className="form-control modal-close deep-purple lighten-4 custombutton"
          >Close</button>
        </div>
      </div>
    );
  }
}

export default ArchiveMessages;
