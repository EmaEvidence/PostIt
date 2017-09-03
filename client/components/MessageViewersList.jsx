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
    return (
    (<li> me </li>)
    );
  }
}

MessageViewersList.propTypes = {
  views: PropTypes.string.isRequired,
};

export default MessageViewersList;
