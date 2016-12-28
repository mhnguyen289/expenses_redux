import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signUp, login, demo } from '../actions/session_actions';
import { clearMessage } from '../actions/message_actions';
import SessionForm from '../components/SessionForm';

class Session extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLogin: props.location.pathname === '/login',
      errors: {},
      person: {
        email: '',
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

  componentDidUpdate(prevProps) {
    if (this.props.authenticated) {
      this.context.router.push('/dashboard');
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.clearMessage();
      const isLogin = this.props.location.pathname === '/login';
      this.setState({ isLogin, errors: {} });
    }
  }

  handleChange(e) {
    const person = this.state.person;
    const field = e.target.name;
    person[field] = e.target.value;
    const errors = {};
    this.setState({ person, errors });
  }

  validForm() {
    let valid = true;
    const errors = {};
    const person = this.state.person;
    if (person && person.email.length < 6) {
      valid = false;
      errors.email = 'Enter an email address (min. 6)';
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
    const person = this.state.person;
    if (this.state.isLogin) {
      this.props.login(person);
    } else {
      this.props.signUp(person);
    }
  }

  render() {
    const { message } = this.props;
    return (
      <SessionForm
        buttonValue={this.state.isLogin ? 'Login' : 'Sign Up'}
        email={this.state.person.email}
        password={this.state.person.password}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        demo={this.props.demo}
        emailError={this.state.errors.email}
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
  location: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  clearMessage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  message: state.message,
});

export default connect(
  mapStateToProps,
  { login, demo, signUp, clearMessage }
)(Session);
