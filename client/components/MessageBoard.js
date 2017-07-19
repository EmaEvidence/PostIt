import React from 'react';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import AllMessages from './AllMessages';
import GroupMembers from './GroupMembers';
import GroupMessages from './GroupMessages';
import AddMembers from './AddMembers';

const group = {
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

const messages = {
  messages: [
    {
      priority: 'Critical',
      message: 'We are here',
      to: 'Cohort',
      from: 'Evidence',
      date: '19/12/2001'
    },
    {
      priority: 'Critical',
      message: 'We are here',
      to: 'Campers',
      from: 'Evidence',
      date: '19/12/2001'
    },
    {
      priority: 'Critical',
      message: 'We are here',
      to: 'STCs',
      from: 'Evidence',
      date: '19/12/2001'
    }
  ]
}
class MessageBoard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 deep-purple lighten-4 groupcard">
            <h2>Groups</h2>
            <Groups groups={group.groups} />
          </div>
          <div className="col-sm-1" />
          <AllMessages messages={messages.messages} />
        </div>
        <CreateGroup />
        <GroupMessages />
        <GroupMembers />
        <AddMembers />
      </div>
    );
  }
}

export default MessageBoard;
