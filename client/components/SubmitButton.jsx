import React from 'react';
import PropTypes from 'prop-types';

/**
 * SubmitButton
 * @method SubmitButton
 *
 * @param {function} props creates the page footer
 *
 * @return {ReactElement} markup
 */
const SubmitButton = props => (
  <input
    type={props.type ? props.type : 'submit'}
    className="form-control btn deep-purple lighten-3 custombutton"
    value={props.value}
  />
  );
SubmitButton.defaultProps = {
  type: 'submit'
};
SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string
};
export default SubmitButton;
