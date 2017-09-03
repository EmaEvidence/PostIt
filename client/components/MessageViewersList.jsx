import React from 'react';
import PropTypes from 'prop-types';

/**
 * Lists out everyone that has read a message
 */
class MessageViewersList extends React.Component {
  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    // let viewersList;
    // if (JSON.parse(this.props.views).length === 0) {
    //   viewersList = (<li>No Viewer Yet </li>);
    // } else {
    //   viewersList = (JSON.parse(this.props.views)).map(view =>
    //     (
    //       <li>
    //         { view }
    //       </li>
    //   ));
    // }
    return (
      // { viewersList }
    (<li> me </li>)
    );
  }
}

MessageViewersList.propTypes = {
  views: PropTypes.string.isRequired,
};

export default MessageViewersList;
