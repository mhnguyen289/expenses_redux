import React, { PropTypes } from 'react';

const getSwatchStyle = (color) => ({
  background: color,
  borderRadius: 3,
  height: 24,
});

const Swatch = ({ color }) => {
  const swatchStyle = getSwatchStyle(color);
  const labelStyle = {
    fontSize: 14,
  };
  return (
    <div>
      <div style={swatchStyle}></div>
      <span style={labelStyle}>
        {color}
      </span>
    </div>
  );
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Swatch;
