import React, { Component } from 'react';
import SwatchSet from './SwatchSet';
import * as colors from '../constants/style';

class StyleGuide extends Component {
  render() {
    const brandColors = [colors.complementaryGreen, colors.complementaryRed];
    const neutralColors = [];
    return (
      <div>
        <SwatchSet colors={brandColors} />
        <SwatchSet colors={neutralColors} />
      </div>
    );
  }
}

export default StyleGuide;
