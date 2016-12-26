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
  <section className="postSection">
    <form>
      <div className="paddedBox">
        <div className="postHeader">
          <span className="postTitle">{buttonValue}</span>
        </div>
        {message &&
          <div className="inputError">{message}</div>
        }
        <div className="postContent">
          <label htmlFor="email" className="postField">
            <span className="labelText">Username</span>
            <div className="group">
              <TextInput
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                error={emailError}
              />
            </div>
            <hr className="ruler" />
          </label>
          <label htmlFor="password" className="postField">
            <span className="labelText">Password</span>
            <div className="group">
              <TextInput
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                error={passwordError}
              />
            </div>
            <hr className="ruler" />
          </label>
        </div>
      </div>
    </form>
    <div className="paddedBox">
      <div className="postButtonGroup">
        <button className="postButton" onClick={handleSave}>
          <div className="postButtonContainer">{buttonValue}</div>
        </button>
      </div>
    </div>
    <button className="demoButton" onClick={demo}>
      <div className="demoButtonContainer">Demo Login</div>
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
