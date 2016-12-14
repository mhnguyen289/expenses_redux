import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './configureStore';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  render(
    <Root store={store} />,
    document.getElementById('root')
  );
});
