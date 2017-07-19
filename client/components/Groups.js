import React from 'react';

class Groups extends React.Component {
  render() {
    const grps = this.props.groups;
    const grpList = grps.map((grp, index) =>
      (
        <li className="grouplist" key={index}> { grp.name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className="new badge deep-purple lighten-3"
          data-toggle="modal"
          data-target="#groupmessages"
        >
          {grp.messages} Messages</span>
          <span className="badge deep-purple lighten-5" data-toggle="modal" data-target="#groupmembers">
            {grp.messages} Members
        </span>
         <a className="waves-effect waves-light modal-close" href="#addmembers">
          Add New</a>
        </li>
    ));
    return (
      <ul>
        { grpList }
      </ul>
    );
  }
}

export default Groups;
