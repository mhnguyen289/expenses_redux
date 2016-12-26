import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { logout } from '../actions/session_actions';

class Header extends React.Component {
  renderLogo(path) {
    return (
      <IndexLink className="logo" to={path}>
        <span className="logo-text">
          ExpensesRedux
        </span>
      </IndexLink>
    );
  }

  renderAccount() {
    return (
      <div className="account">
        <Link
          to="/logout"
          className="item"
          activeClassName="active-item"
          onClick={this.props.logout}
        >
          Logout
        </Link>
        <Link to="/dashboard" className="item" activeClassName="active-item">Dashboard</Link>
        <Link to="/calculator" className="item" activeClassName="active-item">
          <span><i className="fa fa-plus" aria-hidden="true"></i></span>
        </Link>
      </div>
    );
  }

  renderAuth() {
    return (
      <div className="account">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/signup" className="auth-link">Sign Up</Link>
      </div>
    );
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className="content">
        {authenticated ? this.renderLogo('/dashboard') : this.renderLogo('/')}
        {authenticated ? this.renderAccount() : this.renderAuth()}
      </div>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
