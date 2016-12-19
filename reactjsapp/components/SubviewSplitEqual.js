import React, { PropTypes } from 'react';

const SubviewSplitEqual = ({ friends }) => (
  <div className="split-method split-method-equal">
    <h3>Split equally</h3>
    <ul>
      {friends.map(friend =>
        <li key={friend.id}>
          <div className="person">
            <span className="name"><strong>{friend.username}</strong></span>
            <span className="amount">${friend.owed}</span>
          </div>
        </li>
      )}
    </ul>
  </div>
);

SubviewSplitEqual.propTypes = {
  friends: PropTypes.array,
};

export default SubviewSplitEqual;
