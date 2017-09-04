import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input
 *
 * @method Input
 * @param {function} props creates the page footer
 *
 * @constructor
 */
const Input = props => (
  <div className="form-group">
    <input
      type={props.type ? props.type : 'text'}
      onChange={props.action ? props.action : 'onchange'}
      className={`${props.class} form-control` || 'form-control'}
      value={props.value ? props.value : ''}
      name={props.name}
      placeholder={props.placeholder ? props.placeholder : 'Fill This'}
      required={props.required ? props.required : 'false'}
    />
  </div>
  );

Input.propTypes = {
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  class: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default Input;
