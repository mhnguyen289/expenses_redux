import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { getAuthenticated } from '../reducers';
import { logout } from '../actions/session_actions';
import ProfileMenu from './ProfileMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, top: 0, left: 0,
    };
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick);
  }
  handleDocumentClick(e) {
    if (e.target !== this.refs.myProfileImage) {
      this.closeProfileMenu();
    }
  }
  closeProfileMenu() {
    this.setState({
      open: false, top: 0, left: 0,
    });
  }

  toggleProfileMenu() {
    const element = this.refs.myProfileImage;
    const rectangle = element.getBoundingClientRect();
    this.setState((prevState) => ({
      top: rectangle.top + 35,
      left: rectangle.left - 130,
      open: !prevState.open,
    }));
  }

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
        <Link to="/dashboard" className="item" activeClassName="active-item">
          Dashboard
        </Link>
        <Link to="/calculator" className="item" activeClassName="active-item">
          <span><i className="fa fa-plus" aria-hidden="true"></i></span>
        </Link>
        <div className="user-menu">
          <span className="user-image" onClick={(event) => this.toggleProfileMenu(event)}>
            <div className="user-image-container">
              <img ref="myProfileImage" height="32" src="" width="32" alt="" />
            </div>
          </span>
        </div>
        {this.state.open &&
          <ProfileMenu top={this.state.top} left={this.state.left} logout={this.props.logout} />
        }
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
};

const mapStateToProps = (state) => ({
  authenticated: getAuthenticated(state),
});


export default connect(
  mapStateToProps,
  { logout }
)(Header);
