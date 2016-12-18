import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FriendsList = ({ friends }) => (
  <nav className="navigation">
    <ol>
      {friends.map(f =>
        <li key={f.id}>
          <Link to='/' className="text default base" activeClassName="text default base active">
            <span>{f.username}</span>
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
