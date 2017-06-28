import React from 'react';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          name: 'Relative',
          messages: 20
        },
        {
          name: 'Relatives',
          messages: 30
        },
        {
          name: 'Cohorts',
          messages: 2
        }
      ]
    };
  }
  render() {
    const grps = this.state.groups;
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
