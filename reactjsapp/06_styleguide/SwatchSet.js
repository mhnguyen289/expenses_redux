import React, { PropTypes } from 'react';
import Section from './Section';
import Swatch from './Swatch';

const SwatchSet = ({ colors, heading }) => (
  <Section heading={heading}>
    {colors.map((color, index) =>
      <Swatch key={index} color={color} />
    )}
  </Section>
);

SwatchSet.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  heading: PropTypes.string.isRequired,
};

export default SwatchSet;
