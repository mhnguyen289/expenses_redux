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
        <Header />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  {}
)(App);
