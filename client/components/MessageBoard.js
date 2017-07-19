import React from 'react';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import AllMessages from './AllMessages';
import GroupMembers from './GroupMembers';
import GroupMessages from './GroupMessages';
import AddMembers from './AddMembers';
import ArchiveMessages from './ArchiveMessages';
import SentMessages from './SentMessages';

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
          <div className="col-sm-4 dashboardholder">
            <div className="deep-purple lighten-4 dashboard">
              <h3 className="center">Welcome Evidence</h3>
              <div className="row center">
                <a href="#sentmessages" className="dashboardelement"> Sent Messages </a>
                <a href="#archivemessages" className="dashboardelement"> Achived Messages </a>
              </div>
            </div>
            <div className="deep-purple lighten-4 groupholder">
              <h3 className="center">Groups</h3>
              <Groups groups={group.groups} />
            </div>
          </div>
          <div className="col-sm-1" />
          <AllMessages messages={messages.messages} />
        </div>
        <CreateGroup />
        <GroupMessages />
        <GroupMembers />
        <AddMembers />
        <ArchiveMessages />
        <SentMessages />
      </div>
    );
  }
}

export default MessageBoard;
