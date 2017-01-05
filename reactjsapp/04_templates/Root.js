import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, hashHistory, Redirect } from 'react-router';
import App from './App';
import Dashboard from '../05_pages/Dashboard';
import Calculator from '../05_pages/Calculator';
import Session from '../05_pages/Session';

const Root = ({ store }) => (
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Session} />
        <Route path="/signup" component={Session} />
        <Route path="/login" component={Session} />
        <Redirect from="/logout" to="/" />
        <Route path="/calculator" component={Calculator} />
        <Route path="/dashboard/(:selectedId)" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
