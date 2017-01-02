import React, { PropTypes } from 'react';
import Header from '../03_organisms/Header';

const App = ({ children }) => (
  <div>
    <div className="app-header">
      <div className="constraint-width">
        <Header />
      </div>
    </div>
    <div className="main-section constraint-width">
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
