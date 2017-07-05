import React from 'react';

class Groups extends React.Component {
  render() {
    const grps = this.props.groups;
    const grpList = grps.map((grp, index) =>
      <li key={index}> { grp.name } <span className="new badge">{grp.messages}</span></li>
    );
    return (
      <ul>
        { grpList }
      </ul>
    );
  }
}

export default Groups;
