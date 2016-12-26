import React, { PropTypes } from 'react';
import TextInput from './TextInput';

const SessionForm = ({
  email,
  password,
  handleSave,
  handleChange,
  buttonValue,
  emailError,
  passwordError,
  message,
  demo,
}) => (
  <section className="post-section">
    <form>
      <div className="padded-box">
        <div className="post-header">
          <span className="post-title">{buttonValue}</span>
        </div>
        {message &&
          <div className="input-error">{message}</div>
        }
        <div className="post-content">
          <label htmlFor="email" className="post-field">
            <span className="label-text">Username</span>
            <div className="group">
              <TextInput
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                error={emailError}
              />
            </div>
          </label>
          <label htmlFor="password" className="post-field">
            <span className="label-text">Password</span>
            <div className="group">
              <TextInput
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                error={passwordError}
              />
            </div>
          </label>
        </div>
      </div>
    </form>
    <div className="padded-box">
      <div className="post-button-group">
        <button className="post-button" onClick={handleSave}>
          <div className="post-button-container">{buttonValue}</div>
        </button>
      </div>
    </div>
    <button className="demo-button" onClick={demo}>
      <div className="demo-button-container">Demo Login</div>
    </button>
  </section>
);

SessionForm.propTypes = {
  buttonValue: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func,
  demo: PropTypes.func,
  message: PropTypes.string,
};

export default SessionForm;
