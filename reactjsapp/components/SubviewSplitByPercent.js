import React, { PropTypes } from 'react';

const SubviewSplitByPercent = ({ handleChange, friends, owed, remaining }) => (
  <div className="split-method split-method-percent">
    <h3>Split by percentages</h3>
    <ul>
      {friends.map(friend =>
        <li key={friend.id}>
          <div className="person">
            <span className="name"><strong>{friend.username}</strong></span>
            <div className="amount">
              <input
                name={friend.id}
                autoFocus="true"
                type="text"
                value={friend.owed}
                onChange={handleChange}
              />
              <span className="add-on">&nbsp;%</span>
            </div>
          </div>
        </li>
      )}
    </ul>
    <div className="totals">
      <strong>TOTAL</strong>
      <div className="subtotals">
        <span className="owed-total">{owed} %</span>
        <div className="remaining">
          <span className="owed-remaining">{remaining}% left</span>
        </div>
      </div>
    </div>
  </div>
);

SubviewSplitByPercent.propTypes = {
  friends: PropTypes.array,
  owed: PropTypes.string,
  remaining: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default SubviewSplitByPercent;
