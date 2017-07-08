import React from 'react';
import Groups from './Groups';

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
class MessageBoard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3 card-panel">
            <h2 className="how">Groups</h2>
            <Groups groups={group.groups} />
          </div>
          <div className="col-sm-1" />
          <div className="col-sm-7 card-panel">
            <h2 className="how">Message Board</h2>
            <div className="messageholder">
              <i className="chip">From: Emma. priority</i><br />
              <p className="center-align">
              Message: fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfj <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
              </p>
            </div>
            <div className="messageholder">
              <i className="chip">From: Emma. priority</i><br />
              <p className="center-align">
              Message: fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfj <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
              </p>
            </div>
            <div className="messageholder">
              <i className="chip">From: Emma. priority</i><br />
              <p className="center-align">
              Message: fjksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfj <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
                       jksdfksdhfjksdhfsdjkfh dfsdfjsdhfd sdjfsdfjk <br />
              </p>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    );
  }
}

export default MessageBoard;
