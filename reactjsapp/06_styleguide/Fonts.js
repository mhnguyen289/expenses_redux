import React, { PropTypes } from 'react';
import Section from './Section';

const getLoremText = () => (
  'Sed tristique ante lorem, id lobortis risus semper fermentum. In ullamcorper lorem eu ante sodales euismod. Cras nisl diam, ultrices eget gravida at, scelerisque quis tortor. In sed tincidunt dui. Sed ac mauris pharetra, consectetur sapien dignissim, ultricies leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sit amet dui nec justo scelerisque dictum in sit amet massa. Donec nec semper dui, ac lobortis nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce blandit augue sed libero posuere semper. Aliquam blandit cursus molestie. Ut cursus tellus vitae porta congue. Curabitur commodo dui ac quam pretium, eget tincidunt nulla vehicula. Aliquam hendrerit placerat ex finibus euismod. Nulla pulvinar ut leo sed rutrum.'
);

const Fonts = ({ fam, heading }) => (
  <Section heading={heading}>
    <div>
      <p style={{ fontFamily: fam, padding: 0, margin: 0 }}>
        {getLoremText()}
      </p>
      <p>{fam}</p>
    </div>
  </Section>
);

Fonts.propTypes = {
  fam: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default Fonts;
