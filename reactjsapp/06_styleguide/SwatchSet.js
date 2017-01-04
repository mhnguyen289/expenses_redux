import React from 'react';
import Swatch from './Swatch';

const SwatchSet = ({ colors, heading }) => (
  <div>
    <h3>{heading}</h3>
    <ul>
      {colors.map((color, index) =>
        <Swatch color={color} index={index}/>
      )}
    </ul>
  </div>
);

export default SwatchSet;
