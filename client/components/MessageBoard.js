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


class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const createGroup = this.props.createGroupAction;
    const groups = this.props.groups;
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
              <Groups groups={groups} />
              <ul className="pagination mypagination center">
                <li>Prev</li>
                <li> 1 </li>
                <li> 2 </li>
                <li> 3 </li>
                <li>Next</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-1" />
          <AllMessages />
        </div>
        <CreateGroup
          createGroupAction={createGroup}
          group={groups[0]}
        />
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

function mapStateToProps(state) {
  let groups = 'xcvxcv';
  if (state.getUserGroupsReducer !== undefined) {
    groups = state.getUserGroupsReducer.groups;
  }
  return {
    groups
  };
}

export default connect(mapStateToProps, { createGroupAction })(MessageBoard);
