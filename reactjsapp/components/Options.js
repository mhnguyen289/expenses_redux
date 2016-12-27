import React, { PropTypes } from 'react';
import Token from './Token';

class Options extends React.Component {
  constructor(props) {
    super(props);
    const className = '';
    const optionStyles = this.props.list.reduce((acc, item) => {
      acc[item.id] = className;
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

  componentDidUpdate(prevProps) {
    if (prevProps.selectedOptions.length !== this.props.selectedOptions.length) {
      this.setState({ filter: '', filtered: [] });
    }
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

  changeOptionStyle(id, className) {
    const optionStyles = this.state.optionStyles;
    optionStyles[id] = className;
    this.setState({ optionStyles });
  }

  handleMouseLeave(e) {
    const className = '';
    this.changeOptionStyle(e.target.name, className);
  }

  handleMouseEnter(e) {
    const activeClassName = 'active';
    this.changeOptionStyle(e.target.name, activeClassName);
  }

  renderSelectedOptions(selectedOptions, handleRemoveToken) {
    return (
      <nav className="navigation">
        <ol>
          <li>
            With you and :
          </li>
          {selectedOptions.map(item =>
            <li key={item.id}>
              <Token
                key={item.id}
                name={item.id}
                value={item.username}
                handleRemoveToken={handleRemoveToken}
              />
            </li>
          )}
        </ol>
      </nav>
    );
  }

  renderSuggestions(handleAddToken) {
    return (
      <div className="options-container">
        {this.state.filtered.map(item =>
          <div key={item.id} className="option">
            <a
              className={this.state.optionStyles[item.id]}
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
    );
  }

  renderInput() {
    return (
      <input
        type="text"
        name="filter"
        placeholder=""
        className=""
        value={this.state.filter}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    const {
      selectedOptions,
      handleAddToken,
      handleRemoveToken,
    } = this.props;
    return (
      <div>
        {this.renderInput()}
        {this.renderSuggestions(handleAddToken)}
        {this.renderSelectedOptions(selectedOptions, handleRemoveToken)}
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
