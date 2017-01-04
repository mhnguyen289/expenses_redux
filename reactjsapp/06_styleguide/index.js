import React from 'react';
import SwatchSet from './SwatchSet';
import Fonts from './Fonts';
import Text from './Text';

const styleGuideStyle = {
  maxWidth: 1000,
  minWidth: 320,
  paddingRight: 20,
  paddingLeft: 20,
};

const brandColors = ['#FF3226', '#7F4C74'];
const neutralColors = ['#FFF', '#F9F9F9', '#F6F6F6', '#F2F2F2', '#999', '#666', '#333'];
const shades = ['#BF73AD', '#E58AD0', '#40263A', '#7F4C74', '#FF3226',
  '#CC281E', '#FF6919', '#BF261C', '#400D09', '#7F1913'];
const fontFamilies = [
  'Tahoma, Verdana, Segoe, sans-serif',
  'Arial, Helvetica, sans-serif',
];
const variousTextSizes = ['24', '21', '18', '13', '11'];

const StyleGuide = () => (
  <div style={styleGuideStyle}>
    <span>Style Guide</span>
    <SwatchSet colors={brandColors} heading="Brand Colors" />
    <SwatchSet colors={neutralColors} heading="Neutral Colors" />
    <SwatchSet colors={shades} heading="Shades" />
    <Fonts fam={fontFamilies[0]} heading="Primary Fonts" />
    <Fonts fam={fontFamilies[1]} heading="Seconardy Fonts" />
    <Text various={variousTextSizes} heading="Various Text Sizes" />
  </div>
);

export default StyleGuide;
