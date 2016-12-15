import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchExpensesBetween } from '../actions/expenses_actions';
import { getAllExpenses } from '../reducers';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchExpensesBetween(1, 3);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <ul>
          {expenses.map(e =>
            <li key={e.id}>
              Expense Amount: {e.expense_amount},
              Title: {e.title}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchExpensesBetween: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: getAllExpenses(state),
});

export default connect(
  mapStateToProps,
  { fetchExpensesBetween }
)(Dashboard);
