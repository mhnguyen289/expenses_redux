import React, { PropTypes } from 'react';

class ExpenseForm extends React.Component {

  renderAddBillDetails(title, amount, handleChange) {
    return (
      <div className="add-notes">
        <header>Add a Bill</header>
        <div className="body">
          <div className="main-fields">
            <input
              type="text"
              value={title}
              name="title"
              className="description"
              placeholder="Title"
              onChange={handleChange}
            />
            <div className="cost-container">
              <span className="currency-code">$</span>
              <input
                type="text"
                value={amount}
                name="amount"
                className="cost"
                placeholder="0.00"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSplitOptionsButtons() {
    return (
      <div className="split-details">
        <div className="btn-group btn-group-inline" id="split-method">
          <button className="split_button btn btn-gray equal active">=</button>
          <button className="split_button btn btn-gray unequal">1.23</button>
          <button className="split_button btn btn-gray percent">%</button>
        </div>
      </div>
    );
  }

  renderSplitByExactAmount(handleChange, friends, owed, remaining) {
    return (
      <div className="split-method split-method-unequal">
        <h3>Split by exact amounts</h3>
        <ul>
          {friends.map(friend =>
            <li key={friend.id}>
              <div className="person">
                <span className="name"><strong>{friend.username}</strong></span>
                <div className="amount">
                  <span className="add-on">$&nbsp;</span>
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
            <span className="owed-total">${owed}</span>
            <div className="remaining">
              <span className="owed-remaining">${remaining} left</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSplitByPercent(handleChange, friends, owed, remaining) {
    return (
      <div className="split-method split-method-percent" style={{ display: 'none' }}>
        <h3>Split by percentages</h3>
        <ul>
          {friends.map(friend =>
            <li key={friend.id}>
              <div className="person">
                <span className="name"><strong>{friend.username}</strong></span>
                <div className="amount">
                  <input
                    name={friend.id}
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
  }

  renderFooter(handleSave) {
    return (
      <footer>
        <button className="btn btn-large btn-cancel">Cancel</button>
        <button onClick={handleSave} className="btn btn-large btn-min submit">Save</button>
      </footer>
    );
  }

  renderChooseSplitAndSave(handleChange, handleSave, friends, owed, remaining) {
    return (
      <div className="subview active" id="choose-split">
        <div className="body">
          {this.renderSplitOptionsButtons()}
          {this.renderSplitByPercent(handleChange, friends, owed, remaining)}
          {this.renderSplitByExactAmount(handleChange, friends, owed, remaining)}
          {this.renderFooter(handleSave)}
        </div>
      </div>
    );
  }

  render() {
    const { title, amount, handleChange, handleSave, friends, owed, remaining } = this.props;
    return (
      <div className="add container">
        <div className="add-bill">
          {this.renderAddBillDetails(title, amount, handleChange)}
          {this.renderChooseSplitAndSave(handleChange, handleSave, friends, owed, remaining)}
        </div>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string,
  handleSave: PropTypes.func,
  handleChange: PropTypes.func,
  friends: PropTypes.array,
  owed: PropTypes.string,
  remaining: PropTypes.string,
};

export default ExpenseForm;
