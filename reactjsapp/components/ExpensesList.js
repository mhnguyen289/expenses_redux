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
                <span className="featured default base">
                  {e.title}
                </span>
                <div className="text subtle base">
                  {e.expense_amount}
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
