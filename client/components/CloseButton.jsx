import React from 'react';

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

export default CloseButton;
