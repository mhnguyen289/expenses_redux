import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAllExpenses, fetchExpensesWith } from '../actions/expenses_actions';
import { fetchFriendsList } from '../actions/friends_actions';
import { getAllFriends, getAllExpenses } from '../reducers';
import FriendsList from '../components/FriendsList';
import ExpensesList from '../components/ExpensesList';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchFriendsList();
    this.props.fetchAllExpenses();
  }

  componentDidUpdate(prevProps) {
    const { selectedId } = this.props;
    const selectedIdChanged = prevProps.selectedId !== selectedId;
    const selectedIdExists = selectedId && selectedId.length >= 0;
    if (selectedIdExists && selectedIdChanged) {
      this.props.fetchExpensesWith(selectedId);
    } else if (!selectedIdExists && selectedIdChanged) {
      this.props.fetchAllExpenses();
    }
  }

  render() {
    const { friends, expenses, selectedId } = this.props;
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
            />
          }
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    owed: PropTypes.string,
  })).isRequired,
  fetchFriendsList: PropTypes.func.isRequired,
  fetchExpensesWith: PropTypes.func.isRequired,
  fetchAllExpenses: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  expenses: getAllExpenses(state),
  friends: getAllFriends(state),
  selectedId: props.params.selectedId,
});

export default connect(
  mapStateToProps,
  { fetchAllExpenses, fetchFriendsList, fetchExpensesWith }
)(Dashboard);
