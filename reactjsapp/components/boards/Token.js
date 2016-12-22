import React, { PropTypes } from 'react';

const Token = ({ value }) => (
  <div>
    <div className="token-container">
      <div className="token-value">{value}</div>
      <div className="token-remove-button">x</div>
    </div>
  </div>
);

Token.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Token;
