import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFriendsList, fetchExpensesWith } from '../actions/expenses_actions';
import { getAllFriends, getAllExpenses } from '../reducers';
import FriendsList from '../components/FriendsList';
import ExpensesList from '../components/ExpensesList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedId: '2' };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriendsList();
  }

  handleClick(e) {
    const clickedId = e.target.id;
    if (clickedId.length > 0) {
      this.setState({ id: clickedId });
      this.props.fetchExpensesWith(clickedId);
    }
  }

  render() {
    const { friends, expenses } = this.props;
    return (
      <div className="dashboard container">
        <div className="friends-list">
          {friends.length > 0 &&
            <FriendsList
              friends={friends}
              handleClick={this.handleClick}
            />
          }
        </div>
        <div className="expenses-list">
          {friends.length > 0 &&
            <ExpensesList
              expenses={expenses}
              selectedId={this.state.selectedId}
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
    owed: PropTypes.string.isRequired,
  })).isRequired,
  fetchFriendsList: PropTypes.func.isRequired,
  fetchExpensesWith: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: getAllExpenses(state),
  friends: getAllFriends(state),
});

export default connect(
  mapStateToProps,
  { fetchFriendsList, fetchExpensesWith }
)(Dashboard);
