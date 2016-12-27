import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { inviteToJoin } from '../actions/friends_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invite: { email: '' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  handleChange(e) {
    const invite = this.state.invite;
    const field = e.target.name;
    invite[field] = e.target.value.trim();
    this.setState({ invite });
  }

  handleInvite() {
    const invite = this.state.invite;
    this.props.inviteToJoin(invite.email);
  }

  renderFriendsList(friends) {
    return (
      friends.map(friend =>
        <li key={friend.id}>
          <Link
            to={`/dashboard/${friend.id}`}
            activeClassName="active-link"
          >
            {friend.username}
          </Link>
        </li>
      )
    );
  }

  renderAllExpensesLink() {
    return (
      <li>
        <Link
          to="/dashboard"
          activeClassName="active-link"
        >
          All Expenses
        </Link>
      </li>
    );
  }
  render() {
    const { friends } = this.props;
    return (
      <nav className="navigation">
        <ol>
          {friends.length > 0 && this.renderAllExpensesLink()}
          {friends.length > 0 && this.renderFriendsList(friends)}
        </ol>
        <div className="invite">
          <div className="header">Invite friend</div>
          <div className="content">
            <input
              type="text"
              className="secondary-text"
              value={this.state.invite.email}
              placeholder="Enter an email address"
              onChange={this.handleChange}
              name="email"
            />
            <button className="subtle-button" onClick={this.handleInvite}>
              <div className="subtle-button-container">Send Invite</div>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  friends: PropTypes.array,
  inviteToJoin: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

export default connect(
  mapStateToProps,
  { inviteToJoin }
)(Navbar);
