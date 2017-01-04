import React, { PropTypes } from 'react';

const getSwatchStyle = (color) => ({
  background: color,
  borderRadius: 3,
  height: 74,
  width: 74,
  marginRight: 10,
});

const Swatch = ({ color }) => {
  const swatchStyle = getSwatchStyle(color);
  const labelStyle = {
    fontSize: 13,
    textTransform: 'upperCase',
  };
  return (
    <div style={{ marginBottom: 20 }}>
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
