import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './04_templates/Root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  render(
    <Root store={store} />,
    document.getElementById('root')
  );
});
