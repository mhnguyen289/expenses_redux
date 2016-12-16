import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFriendsOf, fetchExpensesBetween } from '../actions/expenses_actions';
import { getAllExpenses } from '../reducers';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchFriendsOf(1);
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
  fetchFriendsOf: PropTypes.func.isRequired,
  fetchExpensesBetween: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: getAllExpenses(state),
});

export default connect(
  mapStateToProps,
  { fetchFriendsOf, fetchExpensesBetween }
)(Dashboard);
