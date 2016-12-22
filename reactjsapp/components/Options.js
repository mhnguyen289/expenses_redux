import React, { PropTypes } from 'react';
import Token from './Token';

class Options extends React.Component {
  constructor(props) {
    super(props);
    const { list } = this.props;
    const className = '';
    const optionStyles = list.reduce((acc, item, index, array) => {
      acc[index] = className;
      return acc;
    }, {});
    this.state = {
      optionStyles,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  changeOptionStyle(index, className) {
    console.log(`mouse entered option ${index}`);
    const optionStyles = this.state.optionStyles;
    optionStyles[index] = className;
    this.setState({ optionStyles });
  }

  handleMouseLeave(e) {
    const leftIndex = e.target.name;
    const className = '';
    this.changeOptionStyle(leftIndex, className);
  }

  handleMouseEnter(e) {
    const enteredIndex = e.target.name;
    const activeClassName = 'active';
    this.changeOptionStyle(enteredIndex, activeClassName);
  }

  render() {
    const {
      list,
      selectedOptions,
      handleAddToken,
      handleRemoveToken,
    } = this.props;
    return (
      <div>
        <div>
          {Object.keys(selectedOptions).map(key =>
            <Token
              key={key}
              name={key}
              value={selectedOptions[key].username}
              handleRemoveToken={handleRemoveToken}
            />
          )}
        </div>
        <div className="options-container">
          {list.map((item, index) =>
            <div key={index} className="option">
              <a
                className={this.state.optionStyles[index]}
                name={index}
                onClick={handleAddToken}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                {item.username}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Options.propTypes = {
  list: PropTypes.array.isRequired,
  selectedOptions: PropTypes.object,
  handleAddToken: PropTypes.func.isRequired,
  handleRemoveToken: PropTypes.func.isRequired,
};

export default Options;
