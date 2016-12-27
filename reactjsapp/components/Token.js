import React, { PropTypes } from 'react';

const Token = ({ name, value, handleRemoveToken }) => (
  <div className="token-container">
    <div className="token-value">{value}</div>
    <div>
      <a
        className="token-remove-button"
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
