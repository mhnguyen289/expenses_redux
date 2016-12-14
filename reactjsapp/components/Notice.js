import React, { PropTypes } from 'react';

const Notice = ({ message }) => (
  <p className="userMessage">
    {message}
  </p>
);

Notice.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notice;
