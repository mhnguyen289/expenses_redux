import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FriendsList = ({ friends, handleClick }) => (
  <nav className="navigation">
    <span className="settle-up action-button">
      Settle Up
    </span>
    <ol>
      {friends.map(friend =>
        <li key={friend.id}>
          <Link
            id={friend.id}
            onClick={handleClick}
          >
            {friend.username}
          </Link>
        </li>
      )}
    </ol>

  </nav>
);

FriendsList.propTypes = {
  friends: PropTypes.array,
  handleClick: PropTypes.func.isRequired,
};

export default FriendsList;
