import React, { PropTypes } from 'react';

const SubviewSplitByExact = ({ handleChange, friends, owed, remaining }) => (
  <div className="split-method split-method-unequal">
    <h3>Split by exact amounts</h3>
    <ul>
      {friends.map(friend =>
        <li key={friend.id}>
          <div className="person">
            <span className="name">
              <strong>
                {friend.username}
              </strong>
            </span>
            <div className="amount">
              <span className="add-on">
                $&nbsp;
              </span>
              <input
                name={friend.id}
                type="text"
                value={friend.owed}
                onChange={handleChange}
              />
            </div>
          </div>
        </li>
      )}
    </ul>
    <div className="totals">
      <strong>TOTAL</strong>
      <div className="subtotals">
        <span className="owed-total">
          ${owed}
        </span>
        <div className="remaining">
          <span className="owed-remaining">
            ${remaining} left
          </span>
        </div>
      </div>
    </div>
  </div>
);

SubviewSplitByExact.propTypes = {
  friends: PropTypes.array,
  owed: PropTypes.string,
  remaining: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default SubviewSplitByExact;
