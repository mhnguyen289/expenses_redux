import React, { PropTypes } from 'react';
import Swatch from './Swatch';

const SwatchSet = ({ colors, heading }) => {
  const headingStyle = {
    fontFamily: 'Helvetica',
    fontSize: 14,
    textTransform: 'upperCase',
    fontWeight: 200,
  };

  return (
    <div>
      <h3 style={headingStyle}>{heading}</h3>
      <ul style={{ listStyle: 'none' }}>
        {colors.map((color, index) =>
          <li key={index}>
            <Swatch color={color} />
          </li>
        )}
      </ul>
    </div>
  );
};

SwatchSet.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  heading: PropTypes.string.isRequired,
};

export default SwatchSet;
