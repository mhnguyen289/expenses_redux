import React from 'react';

const Token = ({ children, onRemoveToken }) => (
  <div className="token-wrapper">
    <div className="token-value">
      {children}
    </div>
    <div
      className="token-remove-button"
      onClick={onRemoveToken}
    >x</div>
  </div>
);

Token.propTypes = {
  children: React.PropTypes.string.isRequired,
  onRemoveToken: React.PropTypes.func,
};

export default Token;
