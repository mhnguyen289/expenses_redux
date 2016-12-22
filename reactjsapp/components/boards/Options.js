import React, { PropTypes } from 'react';

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
      selectedIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(e) {
    const selectedIndex = e.target.name;
    console.log(`clicked on option ${selectedIndex}`);
    this.setState({ selectedIndex });
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
    return (
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
    );
  }
}

Options.propTypes = {
  list: PropTypes.array.isRequired,
};

export default Options;
