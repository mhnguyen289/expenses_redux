import React, { PropTypes } from 'react';

const TextInput = ({
  type,
  value,
  name,
  className,
  placeholder,
  onChange,
  error,
}) => (
  <div>
    <input
      type={type}
      value={value}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error &&
      <div className="inputError">{error}</div>
    }
  </div>
);

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
