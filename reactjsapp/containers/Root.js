import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import App from './App';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';

const Root = ({ store }) => (
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Redirect from="/logout" to="/login" />
        <Route path="/signup" component={SignUp} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
