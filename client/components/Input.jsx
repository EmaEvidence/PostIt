import React from 'react';

/**
 * Input
 *
 * @method Input
 * @param {function} props creates the page footer
 *
 * @constructor
 */
function Input(props) {
  return (
    <div className="form-group">
      <input
        type={props.type || 'text'}
        onChange={props.action}
        className={`${props.class} form-control` || 'form-control'}
        value={props.value || ''}
        name={props.name}
        placeholder={props.placeholder || ''}
        required={props.required || 'false'}
      />
    </div>
  );
}

Input.propTypes = {
  type: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
  class: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  required: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Input;
