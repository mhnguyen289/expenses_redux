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
    this.state = { friendId: 5, };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriendsOf(1);
    this.props.fetchExpensesBetween(1, 3);
  }

  handleClick(e) {
    const id = e.target.id;
    if (id.length > 0) {
      this.setState({ friendId: id });
      this.props.fetchExpensesBetween(1, id);
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
          <ExpensesList expenses={expenses} user={user} friendId={this.state.friendId}/>
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
