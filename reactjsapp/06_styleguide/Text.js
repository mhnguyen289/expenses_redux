import React, { PropTypes } from 'react';
import Section from './Section';

const Text = ({ heading, various }) => (
  <Section heading={heading}>
    <div>
      {various.map((fontSize, index) =>
        <div
          key={index}
          style={{ fontSize }}
        >
          Some {fontSize} pixel size text.
        </div>
      )}
    </div>
  </Section>
);

Text.propTypes = {
  heading: PropTypes.string.isRequired,
  various: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Text;
