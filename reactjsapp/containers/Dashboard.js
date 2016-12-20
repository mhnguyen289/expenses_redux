import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchExpensesBetween } from '../actions/expenses_actions';
import { fetchFriendsOf } from '../actions/friends_actions';
import { getUser, getAllFriends, getAllExpenses } from '../reducers';
import FriendsList from '../components/FriendsList';
import ExpensesList from '../components/ExpensesList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friendId: '5' };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.fetchFriendsOf(1);
    if (this.state.friendId.length > 0) {
      this.props.fetchExpensesBetween(1, this.state.friendId);
    }
  }

  handleClick(e) {
    const clickedId = e.target.id;
    const { user } = this.props;
    if (clickedId.length > 0) {
      this.setState({ friendId: clickedId });
      this.props.fetchExpensesBetween(user.id, clickedId);
    }
  }

  render() {
    const { friends, expenses, user } = this.props;
    return (
      <div className="dashboard container">
        <div className="friends-list">
          <FriendsList friends={friends} handleClick={this.handleClick} />
        </div>
        <div className="expenses-list">
          <ExpensesList expenses={expenses} user={user} friendId={this.state.friendId} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchFriendsOf: PropTypes.func.isRequired,
  fetchExpensesBetween: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  friends: PropTypes.array.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  expenses: getAllExpenses(state),
  friends: getAllFriends(state),
  user: getUser(state),
});

export default connect(
  mapStateToProps,
  { fetchFriendsOf, fetchExpensesBetween }
)(Dashboard);
