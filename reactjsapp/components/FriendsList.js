import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class FriendsList extends React.Component {

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
    console.log(e.target.value.trim());
  }

  handleInvite() {
    const invite = this.state.invite;
    console.log(invite.email);
  }

  render() {
    const { friends } = this.props;
    return (
      <nav className="navigation">
        <ol>
          <li>
            <Link
              to="/dashboard"
              activeClassName="active-link"
            >
              All Expenses
            </Link>
          </li>
          {friends.map(friend =>
            <li key={friend.id}>
              <Link
                to={`/dashboard/${friend.id}`}
                activeClassName="active-link"
              >
                {friend.username}
              </Link>
            </li>
          )}
        </ol>
        <div>
          <h3>Invite friend</h3>
          <input
            type="text"
            className=""
            value={this.state.invite.email}
            placeholder="Enter an email address"
            onChange={this.handleChange}
            name="email"
          />
          <button
            type="submit"
            className=""
            onClick={this.handleInvite}
          >Send Invite</button>
        </div>
      </nav>
    );
  }
}

FriendsList.propTypes = {
  friends: PropTypes.array,
};

export default FriendsList;
