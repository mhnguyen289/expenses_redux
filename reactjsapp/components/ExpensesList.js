import React, { PropTypes } from 'react';
import { getFriend } from '../reducers';
import { connect } from 'react-redux';

const ExpensesList = ({ expenses, friend }) => (
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
                    {friend.id == e.paid_by_id ? friend.username : 'you'} paid
                  </span>
                  <span className="paid-amount">
                    ${e.expense_amount}
                  </span>
                </div>
                <div className="owed">
                  <span className="who-owed secondary-text">
                    {friend.id == e.borrower_id ? friend.username : 'you'} owe
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

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    expense_amount: PropTypes.string,
    expense_date: PropTypes.string,
    borrower_id: PropTypes.number,
    paid_by_id: PropTypes.number,
    debt_amount: PropTypes.string,
  })).isRequired,
  friend: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  selectedId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  friend: getFriend(state, props.selectedId),
});

export default connect(
  mapStateToProps,
  {}
)(ExpensesList);
