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
      filter: '',
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleChange(e) {
    if (e.target.name == 'filter') {
      const filter = e.target.value.trim();
      const regex = new RegExp(`^${filter}`, 'i');
      const updatedFiltered = this.props.list.filter(item => regex.test(item.username));
      const isFiltered = filter.length > 0 && updatedFiltered.length > 0;
      const filtered = isFiltered ? updatedFiltered : [];
      this.setState({
        filter,
        filtered,
      });
    }
  }

  changeOptionStyle(index, className) {
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
      selectedOptions,
      handleAddToken,
      handleRemoveToken,
    } = this.props;
    return (
      <div>
        <input
          type="text"
          name="filter"
          placeholder=""
          className=""
          value={this.state.filter}
          onChange={this.handleChange}
        />
        <div>
          {selectedOptions.map(item =>
            <Token
              key={item.id}
              name={item.id}
              value={item.username}
              handleRemoveToken={handleRemoveToken}
            />
          )}
        </div>
        <div className="options-container">
          {this.state.filtered.map((item, index) =>
            <div key={index} className="option">
              <a
                className={this.state.optionStyles[index]}
                name={item.id}
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
  selectedOptions: PropTypes.array,
  handleAddToken: PropTypes.func.isRequired,
  handleRemoveToken: PropTypes.func.isRequired,
};

export default Options;
