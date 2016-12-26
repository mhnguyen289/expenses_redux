import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, hashHistory, Redirect } from 'react-router';
import App from './App';
import Dashboard from './Dashboard';
import Calculator from './Calculator';
import Boards from '../components/boards';
import Session from './Session';

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
        <Route path="/boards" component={Boards} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
