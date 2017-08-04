import React from 'react';
import { connect } from 'react-redux';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import AllMessages from './AllMessages';
import GroupMembers from './GroupMembers';
import GroupMessages from './GroupMessages';
import AddMembers from './AddMembers';
import ArchiveMessages from './ArchiveMessages';
import SentMessages from './SentMessages';
import createGroupAction from '../actions/createGroupAction';


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
    const createGroup = this.props.createGroupAction;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 dashboardholder">
            <div className="deep-purple lighten-4 dashboard">
              <h1 className="row center">
                <input id="icon_prefix" type="search" placeholder="Search Post" className="validate center" />
              </h1>
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
        <CreateGroup createGroupAction={createGroup} />
        <GroupMessages />
        <GroupMembers />
        <AddMembers />
        <ArchiveMessages />
        <SentMessages />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  createGroupAction: React.PropTypes.func.isRequired
};

export default connect(null, { createGroupAction })(MessageBoard);
