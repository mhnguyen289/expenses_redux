import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchExpensesBetween } from '../actions/expenses_actions';
import { fetchFriendsOf } from '../actions/friends_actions';
import { getAllFriends, getAllExpenses } from '../reducers';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchFriendsOf(1);
    this.props.fetchExpensesBetween(1, 3);
  }

  render() {
    const { friends, expenses } = this.props;
    return (
      <div>
        <ul>
          {friends.map(f =>
            <li key={f.id}>
              Friend: {f.username}
            </li>
          )}
        </ul>
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
  friends: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: getAllExpenses(state),
  friends: getAllFriends(state),
});

export default connect(
  mapStateToProps,
  { fetchFriendsOf, fetchExpensesBetween }
)(Dashboard);
