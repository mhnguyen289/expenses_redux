import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAllExpenses, fetchExpensesWith, fetchDebts } from '../actions/expenses_actions';
import { fetchFriendsList } from '../actions/friends_actions';
import { getAllFriends, getAllExpenses, getAllDebts } from '../reducers';
import FriendsList from '../components/FriendsList';
import ExpensesList from '../components/ExpensesList';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchFriendsList();
    this.props.fetchAllExpenses();
    this.props.fetchDebts();
  }

  componentDidUpdate(prevProps) {
    const { selectedId } = this.props;
    const selectedIdChanged = prevProps.selectedId !== selectedId;
    const selectedIdExists = selectedId && selectedId.length >= 0;
    if (selectedIdExists && selectedIdChanged) {
      this.props.fetchExpensesWith(selectedId);
    } else if (!selectedIdExists && selectedIdChanged) {
      this.props.fetchAllExpenses();
      this.props.fetchDebts();
    }
  }

  render() {
    const { friends, expenses, selectedId, debts } = this.props;
    return (
      <div className="dashboard container">
        <div className="friends-list">
          {friends.length > 0 &&
            <FriendsList
              friends={friends}
            />
          }
        </div>
        <div className="expenses-list">
          {friends.length > 0 &&
            <ExpensesList
              expenses={expenses}
              selectedId={selectedId}
              debts={debts}
            />
          }
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  debts: PropTypes.arrayOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object),
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    owed: PropTypes.string,
  })).isRequired,
  fetchFriendsList: PropTypes.func.isRequired,
  fetchExpensesWith: PropTypes.func.isRequired,
  fetchAllExpenses: PropTypes.func.isRequired,
  fetchDebts: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  expenses: getAllExpenses(state),
  debts: getAllDebts(state),
  friends: getAllFriends(state),
  selectedId: props.params.selectedId,
});

export default connect(
  mapStateToProps,
  { fetchDebts, fetchAllExpenses, fetchFriendsList, fetchExpensesWith }
)(Dashboard);
