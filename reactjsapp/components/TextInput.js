import React, { PropTypes } from 'react';

const TextInput = ({
  type,
  name,
  value,
  onChange,
  error,
}) => (
  <div className="group">
    <input
      type={type}
      name={name}
      value={value}
      placeholder=""
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
  error: PropTypes.string,
};

export default TextInput;
