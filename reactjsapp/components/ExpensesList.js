import React, { PropTypes } from 'react';

const ExpensesList = ({ expenses }) => (
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
                    {e.paid_by_id} paid
                  </span>
                  <span className="paid-amount">
                    ${e.expense_amount}
                  </span>
                </div>
                <div className="owed">
                  <span className="who-owed secondary-text">
                    {e.borrower_id} owes
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
  expenses: PropTypes.array,
};

export default ExpensesList;
