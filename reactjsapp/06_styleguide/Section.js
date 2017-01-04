import React, { PropTypes } from 'react';

const Section = ({ heading, children }) => {
  const sectionStyle = {
    marginBottom: 30,
  };

  const headingStyle = {
    fontFamily: 'Tahoma',
    fontSize: 14,
    textTransform: 'upperCase',
    fontWeight: 200,
  };

  const contentStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  return (
    <div style={sectionStyle}>
      <h3 style={headingStyle}>
        {heading}
      </h3>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

export default Section;
