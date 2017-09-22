import React from 'react';
import PropTypes from 'prop-types';

/**
 * CloseButton
 * @method CloseButton
 *
 * @param {function} props creates the page footer
 *
 * @return {ReactElement} markup
 */
const CloseButton = props => (
  <button
    type="reset"
    className="right close modal-close form-header"
    data-dismiss="modal"
    onClick={props.action}
  >Close</button>
  );
CloseButton.propTypes = {
  action: PropTypes.func.isRequired,
};

export default CloseButton;
