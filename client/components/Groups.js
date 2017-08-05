import React from 'react';

class Groups extends React.Component {
  render() {
    let grps = this.props.groups;
    let grpList = '';
    if (grps['0'] !== undefined ) {
      grpList = grps['0'].map((grp, index) =>
        (
          <li className="grouplist" key={index}> { grp.group_name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span
            className="new badge deep-purple lighten-3 clickable"
            data-toggle="modal"
            data-target="#groupmessages"
          >
            {grp.messages} Messages</span>
            <span
              className="badge deep-purple lighten-5 clickable"
              data-toggle="modal"
              data-target="#groupmembers"
            >
              {grp.messages} Members
          </span>
            <a className="waves-effect waves-light modal-close" href="#addmembers">
            Add New</a>
          </li>
      ));
    } else {
      grpList = <li> No Group Yet</li>;
    }
    return (
      <ul>
        { grpList }
      </ul>
    );
  }
}

Groups.propTypes = {
  groups: React.PropTypes.func.isRequired,
};

export default Groups;
