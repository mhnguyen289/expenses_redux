import React, { PropTypes } from 'react';
import { getFriend } from '../reducers';
import { connect } from 'react-redux';

class ExpensesList extends React.Component {

  renderAllExpenses(expenses) {
    return (
      <div>
        <div className="header">
          <span className="featured default base">
            All Expenses
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
                        you paid
                      </span>
                      <span className="paid-amount">
                        ${e.expense_amount}
                      </span>
                    </div>
                    <div className="owed">
                      <span className="who-owed secondary-text">
                        total lent
                      </span>
                      <span className="owed-amount">
                        {e.lent}
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

  renderNone() {
    return (
      <div>
        <div className="header">
          <span className="featured default base">
            Expenses With
          </span>
        </div>
        <div className="content">
          <div className="user-message">None</div>
        </div>
      </div>
    );
  }

  renderExpensesBetween(expenses, friend) {
    return (
      <div>
        {expenses.length <= 0
          ?
            this.renderNone()
          :
          <div>
            <div className="header">
              <span className="featured default base">
                Expenses With
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
                            {friend.id === e.paid_by_id ? friend.username : 'you'} paid
                          </span>
                          <span className="paid-amount">
                            ${e.expense_amount}
                          </span>
                        </div>
                        <div className="owed">
                          <span className="who-owed secondary-text">
                            {friend.id === e.borrower_id ? friend.username : 'you'} owe
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
        }
      </div>
    );
  }

  render() {
    const { selectedId, expenses, friend } = this.props;
    return (
      <div>
        {selectedId && selectedId.length > 0
          ?
            this.renderExpensesBetween(expenses, friend)
          :
            this.renderAllExpenses(expenses)
        }
      </div>
    );
  }
}

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    expense_amount: PropTypes.string,
    expense_date: PropTypes.string,
    borrower_id: PropTypes.number,
    paid_by_id: PropTypes.number,
    debt_amount: PropTypes.string,
    lent: PropTypes.string,
  })).isRequired,
  friend: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }),
  selectedId: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  friend: getFriend(state, props.selectedId),
});

export default connect(
  mapStateToProps,
  {}
)(ExpensesList);
