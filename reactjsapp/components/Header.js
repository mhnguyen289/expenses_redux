import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { getAuthenticated } from '../reducers';
import { demo, logout } from '../actions/session_actions';

class Header extends React.Component {
  renderLogo() {
    return (
      <IndexLink className="logo" to="/">
        <span className="logo-text">ExpensesRedux</span>
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
        <button className="demo-button" onClick={this.props.demo}>
          Demo Login
        </button>
      </div>
    );
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className="content">
        {this.renderLogo()}
        {authenticated
          ?
          this.renderAccount()
          :
          this.renderAuth()
        }
      </div>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  demo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: getAuthenticated(state),
});

export default connect(
  mapStateToProps,
  { demo, logout }
)(Header);
