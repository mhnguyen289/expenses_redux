import React from 'react';
import Swatch from './Swatch';

const SwatchSet = ({ colors }) => (
  <ul>
    {colors.map((color, index) =>
      <Swatch color={color} index={index}/>
    )}
  </ul>
);

export default SwatchSet;
