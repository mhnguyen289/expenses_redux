import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FriendsList = ({ friends, handleClick }) => (
  <nav className="navigation">
    <ol>
      {friends.map(friend =>
        <li key={friend.id}>
          <Link
            to="/friend"
            id={friend.id}
            onClick={handleClick}
            className="text default base"
            activeClassName="text default base active"
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
