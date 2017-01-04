import React, { PropTypes } from 'react';

const Developer = ({ children }) => (
  <div>
    <div className="">
      <div className="">
      </div>
    </div>
    <div className="">
      {children}
    </div>
  </div>
);

Developer.propTypes = {
  children: PropTypes.node,
};

export default Developer;
