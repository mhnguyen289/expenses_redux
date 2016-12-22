import React, { PropTypes } from 'react';

const Token = ({ name, value, handleRemoveToken }) => (
  <div className="token-container">
    <div className="token-value">{value}</div>
    <div className="token-remove-button">
      <a name={name} onClick={handleRemoveToken}>x</a>
    </div>
  </div>
);

Token.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleRemoveToken: PropTypes.func.isRequired,
};

export default Token;
