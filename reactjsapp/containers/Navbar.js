import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { inviteToJoin } from '../actions/friends_actions';
import { showMessage } from '../actions/message_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
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

  validForm() {
    let valid = true;
    const errors = {};
    const invite = this.state.invite;
    if (invite && invite.email.length < 6) {
      valid = false;
      errors.email = 'Enter an email address (min. 6)';
      this.props.showMessage(errors.email);
    }
    if (!valid) {
      this.setState({ errors });
    }
    return valid;
  }

  handleInvite(e) {
    e.preventDefault();
    if (!this.validForm()) {
      return;
    }
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

  renderInviteFriend() {
    return (
      <div className="invite">
        <div className="header">Invite friend</div>
        <div className="content">
          <input
            type="text"
            name="email"
            value={this.state.invite.email}
            className="secondary-text"
            placeholder="Enter an email address"
            onChange={this.handleChange}
          />
          <button className="subtle-button" onClick={this.handleInvite}>
            <div className="subtle-button-container">Send Invite</div>
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { friends, message } = this.props;
    return (
      <nav className="navigation">
        <ol>
          {friends.length > 0 && this.renderAllExpensesLink()}
          {friends.length > 0 && this.renderFriendsList(friends)}
        </ol>
        {message &&
          <div className="input-error">{message}</div>
        }
        {this.renderInviteFriend()}
      </nav>
    );
  }
}

Navbar.propTypes = {
  friends: PropTypes.array,
  inviteToJoin: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(
  mapStateToProps,
  { inviteToJoin, showMessage }
)(Navbar);
