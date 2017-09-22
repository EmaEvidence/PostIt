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
    type="submit"
    className="form-control btn deep-purple lighten-3 custombutton"
    value={props.value}
  />
  );

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
};
export default SubmitButton;
