import React, { PropTypes } from 'react';
import * as options from '../constants/split_options';
import SubviewSplitEqual from './SubviewSplitEqual';
import SubviewSplitByExact from './SubviewSplitByExact';
import SubviewSplitByPercent from './SubviewSplitByPercent';
import ExpenseDatePicker from './ExpenseDatePicker';
import Options from './Options';

class ExpenseForm extends React.Component {
  renderAddBillDetails(title, amount, handleChange) {
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
        <button
          onClick={handleSave}
          className="btn btn-large btn-min submit"
        >Save</button>
      </footer>
    );
  }

  renderDatePicker(expenseDate, handleDateChange) {
    return (
      <div className="date-picker-container">
        <ExpenseDatePicker
          expenseDate={expenseDate}
          handleDateChange={handleDateChange}
        />
      </div>
    );
  }

  renderErrorMessage(error) {
    return <div>{error.length > 0 && <div className="input-error">{error}</div>}</div>;
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
      list,
      selectedOptions,
      handleAddToken,
      handleRemoveToken,
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
          {this.renderErrorMessage(error)}
          {this.renderAddBillDetails(title, amount, handleChange)}
          <div className="subview">
            <div className="body">
              {this.renderSplitOptionsButtons(handleClick, nameOfButtonClicked)}
              {this.renderSubview(splitProps)}
            </div>
          </div>
          <div className="subview">
            <div className="body">
              {this.renderDatePicker(expenseDate, handleDateChange)}
            </div>
          </div>
          {this.renderFooter(handleSave)}
        </div>
        <div className="add-friends">
          <Options
            list={list}
            selectedOptions={selectedOptions}
            handleAddToken={handleAddToken}
            handleRemoveToken={handleRemoveToken}
          />
        </div>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  error: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.string,
  friends: PropTypes.array,
  owed: PropTypes.string,
  remaining: PropTypes.string,
  expenseDate: PropTypes.string,
  selectedOptions: PropTypes.array,
  list: PropTypes.array.isRequired,
  selectedSplitOption: PropTypes.string.isRequired,
  nameOfButtonClicked: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAddToken: PropTypes.func.isRequired,
  handleRemoveToken: PropTypes.func.isRequired,
};

export default ExpenseForm;
