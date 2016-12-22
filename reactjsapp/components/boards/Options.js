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
      selectedOptions: {},
    };
    this.handleRemoveToken = this.handleRemoveToken.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleRemoveToken(e) {
    const removeIndex = e.target.name;
    console.log(`to remove at index ${removeIndex}`);
    const selectedOptions = this.state.selectedOptions;
    const deletedOption = delete selectedOptions[removeIndex];
    console.log(`remove token ${deletedOption}`);
    this.setState({ selectedOptions });
  }

  handleClick(e) {
    const { list } = this.props;
    const selectedIndex = e.target.name;
    const selectedOptions = this.state.selectedOptions;
    selectedOptions[selectedIndex] = list[selectedIndex];

    console.log(`clicked on option ${selectedIndex}`);
    console.log(`clicked on option ${selectedOptions[selectedIndex].username}`);

    this.setState({ selectedOptions });
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
    const { list } = this.props;
    const { selectedOptions } = this.state;
    return (
      <div>
        <div>
          {Object.keys(selectedOptions).map(key =>
            <Token
              key={key}
              name={key}
              value={selectedOptions[key].username}
              handleRemoveToken={this.handleRemoveToken}
            />
          )}
        </div>
        <div className="options-container">
          {list.map((item, index) =>
            <div key={index} className="option">
              <a
                className={this.state.optionStyles[index]}
                name={index}
                onClick={this.handleClick}
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
};

export default Options;
