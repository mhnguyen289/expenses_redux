import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class App extends React.Component {
  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="app-header">
          <div className="constraint-width">
            <Header />
          </div>
        </div>
        <div>
          <div className="main-section constraint-width">
            <div className="content">
              <div className="box">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  {}
)(App);
