import React, { PropTypes } from 'react';
import { getFriend } from '../reducers';
import { connect } from 'react-redux';

class ExpensesList extends React.Component {
  render() {
    const { expenses, user, friend } = this.props;
    return (
      <div>
        <div className="header">
          <span className="featured default base">
            All Expenses Between
          </span>
        </div>
        <div className="content">
          <ul className="list">
            {expenses.map(e =>
              <li key={e.id}>
                <div className="list-item">
                  <div className="expense-details">
                    <span className="expense-title featured default base">
                      {e.title}
                    </span>
                    <div className="paid">
                      <span className="who-paid secondary-text">
                        {user.id == e.paid_by_id ? 'you' : friend.username} paid
                      </span>
                      <span className="paid-amount">
                        ${e.expense_amount}
                      </span>
                    </div>
                    <div className="owed">
                      <span className="who-owed secondary-text">
                        {user.id == e.borrower_id ? 'you' : friend.username} owe
                      </span>
                      <span className="owed-amount">
                        ${e.debt_amount}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

ExpensesList.propTypes = {
  expenses: PropTypes.array,
  user: PropTypes.object,
  friend: PropTypes.object,
  friendId: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  friend: getFriend(state, props.friendId),
});

export default connect(
  mapStateToProps,
  {}
)(ExpensesList);
