import React from 'react';

const Swatch = ({ color, index }) => (
  <li key={index}>
    <span className="swatch" style={{ background: color }}></span>
    <span className="label">
      {color}
    </span>
  </li>
);

export default Swatch;
