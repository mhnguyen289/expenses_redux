import React, { PropTypes } from 'react';

const Developer = ({ children }) => (
  <div>
    <div className="app-header">
      <div className="constraint-width">
        Developer Style Guide
      </div>
    </div>
    <div className="main-section constraint-width">
      {children}
    </div>
  </div>
);

Developer.propTypes = {
  children: PropTypes.node,
};

export default Developer;
