import React, { PropTypes } from 'react';
import * as options from '../constants/split_options';
import SubviewSplitEqual from './SubviewSplitEqual';
import SubviewSplitByExact from './SubviewSplitByExact';
import SubviewSplitByPercent from './SubviewSplitByPercent';
import ExpenseDatePicker from './ExpenseDatePicker';

class ExpenseForm extends React.Component {
  renderAddBillDetails(title, amount, handleChange, expenseDate, handleDateChange) {
    return (
      <div className="add-notes">
        <header>Add a Bill</header>
        <div className="body">
          <div className="main-fields">
            <input
              type="text"
              value={title}
              name="title"
              className="description"
              placeholder="Title"
              onChange={handleChange}
            />
            <div className="cost-container">
              <span className="currency-code">$</span>
              <input
                type="text"
                value={amount}
                name="amount"
                className="cost"
                placeholder="0.00"
                onChange={handleChange}
              />
            </div>
            <div className="date-picker-container">
              <ExpenseDatePicker
                value={expenseDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSplitOptionsButtons(handleClick, nameOfButtonClicked) {
    const className = 'split_button btn btn-gray';
    const activeClassName = `${className} active`;
    const buttonStyles = {
      equal: className,
      exact: className,
      percent: className,
    };
    buttonStyles[nameOfButtonClicked] = activeClassName;
    return (
      <div className="split-details">
        <div className="btn-group btn-group-inline" id="split-method">
          <button
            onClick={handleClick}
            name="equal"
            className={buttonStyles.equal}
          >=</button>
          <button
            onClick={handleClick}
            name="exact"
            className={buttonStyles.exact}
          >1.23</button>
          <button
            onClick={handleClick}
            name="percent"
            className={buttonStyles.percent}
          >%</button>
        </div>
      </div>
    );
  }

  renderSubview(splitProps) {
    const {
      friends,
      handleChange,
      selectedSplitOption,
      owed,
      remaining,
    } = splitProps;
    const isSplitByPercent = selectedSplitOption == options.SPLIT_BY_PERCENT;
    const isSplitByExact = selectedSplitOption == options.SPLIT_EXACT_AMOUNT;
    const isSplitEqually = selectedSplitOption == options.SPLIT_EQUALLY;
    return (
      <div>
        {isSplitByPercent &&
          <SubviewSplitByPercent
            handleChange={handleChange}
            friends={friends}
            owed={owed}
            remaining={remaining}
          />
        }
        {isSplitByExact &&
          <SubviewSplitByExact
            handleChange={handleChange}
            friends={friends}
            owed={owed}
            remaining={remaining}
          />
        }
        {isSplitEqually &&
          <SubviewSplitEqual
            friends={friends}
          />
        }
      </div>
    );
  }

  renderFooter(handleSave) {
    return (
      <footer>
        <button className="btn btn-large btn-cancel">Cancel</button>
        <button
          onClick={handleSave}
          className="btn btn-large btn-min submit"
        >Save</button>
      </footer>
    );
  }

  renderChooseSplitAndSave(handleClick, handleSave, splitProps, nameOfButtonClicked) {
    return (
      <div className="subview active" id="choose-split">
        <div className="body">
          {this.renderSplitOptionsButtons(handleClick, nameOfButtonClicked)}
          {this.renderSubview(splitProps)}
          {this.renderFooter(handleSave)}
        </div>
      </div>
    );
  }

  render() {
    const {
      title,
      amount,
      handleClick,
      selectedSplitOption,
      handleChange,
      handleSave,
      friends,
      owed,
      remaining,
      error,
      nameOfButtonClicked,
      expenseDate,
      handleDateChange,
    } = this.props;
    const splitProps = {
      friends,
      handleChange,
      selectedSplitOption,
      owed,
      remaining,
    };

    return (
      <div className="add container">
        <div className="add-bill">
          {error.length > 0 &&
            <div className="input-error">
              {error}
            </div>
          }
          {this.renderAddBillDetails(title, amount, handleChange, expenseDate, handleDateChange)}
          {this.renderChooseSplitAndSave(handleClick, handleSave,
            splitProps, nameOfButtonClicked)}
        </div>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string,
  friends: PropTypes.array,
  owed: PropTypes.string,
  remaining: PropTypes.string,
  handleSave: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedSplitOption: PropTypes.string.isRequired,
  error: PropTypes.string,
  nameOfButtonClicked: PropTypes.string.isRequired,
  expenseDate: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func,
};

export default ExpenseForm;
