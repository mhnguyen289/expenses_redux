import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProfileMenu = ({ top, left, logout }) => (
  <div style={{ top, left }} className="popover">
    <ul className="popover-content">
      <li>
        <div className="menu-item-container">
          <Link to="/">Profile</Link>
        </div>
      </li>
      <li>
        <div className="menu-item-container">
          <Link to="/logout" onClick={logout}>Logout</Link>
        </div>
      </li>
    </ul>
  </div>
);

ProfileMenu.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ProfileMenu;
