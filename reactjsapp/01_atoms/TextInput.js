import React, { PropTypes } from 'react';

const TextInput = ({
  type,
  name,
  value,
  className = '',
  placeholder = '',
  onChange,
  error,
}) => (
  <div className="group">
    <input
      type={type}
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error &&
      <div className="input-error">{error}</div>
    }
  </div>
);

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
