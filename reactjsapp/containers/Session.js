import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAuthenticated } from '../reducers';
import { login, demo, signUp, clearMessage } from '../actions/session_actions';
import SessionForm from '../components/SessionForm';

class Session extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      person: {
        username: '',
        password: '',
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.message) {
      this.props.clearMessage();
    }
  }

  componentDidUpdate() {
    if (this.props.authenticated) {
      this.context.router.push('/');
    }
  }

  handleChange(e) {
    const person = this.state.person;
    const field = e.target.name;
    person[field] = e.target.value;
    this.setState({ person });
  }

  validForm() {
    let valid = true;
    const errors = {};
    const person = this.state.person;
    if (person && person.username.length < 6) {
      valid = false;
      errors.username = 'Enter a username (min. 6)';
    } else if (person && person.password.length < 6) {
      valid = false;
      errors.password = 'Enter a password (min. 6)';
    }
    if (!valid) {
      this.setState({ errors });
    }
    return valid;
  }

  handleSave(e) {
    e.preventDefault();
    if (!this.validForm()) {
      return;
    }
    const { typeLogin } = this.props;
    const person = this.state.person;
    if (typeLogin) {
      this.props.login(person);
    } else {
      this.props.signUp(person);
    }
  }

  render() {
    const { typeLogin, message } = this.props;
    return (
      <SessionForm
        buttonValue={typeLogin === 'login' ? 'Login' : 'Sign Up'}
        username={this.state.person.username}
        password={this.state.person.password}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        demo={this.props.demo}
        usernameError={this.state.errors.username}
        passwordError={this.state.errors.password}
        message={message}
      />
    );
  }
}

Session.contextTypes = {
  router: PropTypes.object,
};

Session.propTypes = {
  login: PropTypes.func.isRequired,
  demo: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  typeLogin: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  clearMessage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authenticated: getAuthenticated(state),
  message: state.message,
});

export default connect(
  mapStateToProps,
  { login, demo, signUp, clearMessage }
)(Session);
