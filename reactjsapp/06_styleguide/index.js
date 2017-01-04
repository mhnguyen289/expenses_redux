import React from 'react';
import SwatchSet from './SwatchSet';
import * as colors from '../constants/style';

const StyleGuide = () => {
  const styleGuideStyle = {
    maxWidth: 1000,
    minWidth: 320,
    paddingRight: 20,
    paddingLeft: 20,
  };
  const brandColors = [
    colors.COMPLEMENTARY_GREEN,
    colors.COMPLEMENTARY_RED,
  ];
  const neutralColors = [
    colors.GRAY_ONE,
    colors.GRAY_TWO,
    colors.GRAY_THREE,
  ];
  const shades = [
    colors.GREEN_ONE,
    colors.GREEN_TWO,
    colors.GREEN_THREE,
  ];
  return (
    <div style={styleGuideStyle}>
      <SwatchSet colors={brandColors} heading="Brand Colors" />
      <SwatchSet colors={neutralColors} heading="Neutral Colors" />
      <SwatchSet colors={shades} heading="Shades" />
    </div>
  );
};

export default StyleGuide;
