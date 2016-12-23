import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FriendsList = ({ friends }) => (
  <nav className="navigation">
    <ol>
      <li>
        <Link
          to="/dashboard"
          activeClassName="active-link"
        >
          All Expenses
        </Link>
      </li>
      {friends.map(friend =>
        <li key={friend.id}>
          <Link
            to={`/dashboard/${friend.id}`}
            activeClassName="active-link"
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
};

export default FriendsList;
