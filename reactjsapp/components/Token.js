import React, { PropTypes } from 'react';

const Token = ({ name, value, handleRemoveToken }) => (
  <div className="input-token-container">
    <div className="input-token-value">{value}</div>
    <div>
      <a
        className="input-token-remove-button"
        name={name}
        onClick={handleRemoveToken}
      >
        x
      </a>
    </div>
  </div>
);

Token.propTypes = {
  name: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  handleRemoveToken: PropTypes.func.isRequired,
};

export default Token;
