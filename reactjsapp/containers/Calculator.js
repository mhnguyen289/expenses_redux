import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { addExpense } from '../actions/expenses_actions';
import * as options from '../constants/split_options';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSplitOption: options.SPLIT_EQUALLY,
      options: {
        equal: options.SPLIT_EQUALLY,
        exact: options.SPLIT_EXACT_AMOUNT,
        percent: options.SPLIT_BY_PERCENT,
      },
      expense: {
        friends: [
          { id: 2, username: 'andy', owed: '' },
          { id: 3, username: 'bonnie', owed: '' },
          { id: 5, username: 'jeffrey', owed: '' },
        ],
        owed: '0.00',
        remaining: '0.00',
        title: '',
        amount: '',
        split: {},
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const selectedSplitOption = this.state.options[e.target.name];
    this.setState({
      ...this.state,
      selectedSplitOption,
    });
  }

  makeDecimal(number) {
    let num = Math.trunc(number * 100);
    num /= 100;
    return num;
  }

  splitByPercent(friends, amount) {
    const split = friends.reduce((acc, item) => {
      acc[item.id] = this.makeDecimal(amount * item.owed / 100);
      return acc;
    }, {});
    return split;
  }

  splitByExactAmount(friends) {
    const split = friends.reduce((acc, item) => {
      acc[item.id] = item.owed;
      return acc;
    }, {});
    return split;
  }

  splitEqually(friends, amount) {
    const split = friends.reduce((acc, item, index, array) => {
      acc[item.id] = this.makeDecimal(amount / array.length);
      return acc;
    }, {});
    return split;
  }

  splitExpenses(splitType, expense) {
    const { friends, amount } = expense;
    switch (splitType) {
      case options.SPLIT_BY_PERCENT:
        return this.splitByPercent(friends, amount);
      case options.SPLIT_EXACT_AMOUNT:
        return this.splitByExactAmount(friends);
      case options.SPLIT_EQUALLY:
        return this.splitEqually(friends, amount);
      default:
        return {};
    }
  }

  updateOwed(splitType, friendId, owedValue, expense) {
    expense.friends.forEach((item) => {
      if (item.id == friendId) {
        item.owed = owedValue;
      }
    });
    const amount = (splitType == options.SPLIT_BY_PERCENT) ? 100.00 : expense.amount;
    let total = 0;
    expense.friends.forEach((item) => {
      total += Number(item.owed);
    });
    expense.owed = total.toString();
    const remaining = this.makeDecimal(amount - total);
    expense.remaining = remaining.toString();
    return expense;
  }

  handleChange(e) {
    let expense = this.state.expense;
    const splitOption = this.state.selectedSplitOption;
    console.log(`${splitOption}`);

    const field = e.target.name;
    if (field == 'amount') {
      expense[field] = e.target.value.trim();
    } else {
      expense[field] = e.target.value;
    }

    if (splitOption == options.SPLIT_EQUALLY) {
      expense.split = this.splitExpenses(splitOption, expense);
      expense.friends.forEach(friend => {
        friend.owed = expense.split[friend.id];
      });
    } else {
      const friendId = e.target.name;
      const owedValue = e.target.value.trim();
      expense = this.updateOwed(splitOption, friendId, owedValue, expense);
      expense.split = this.splitExpenses(splitOption, expense);
    }

    this.logSplit();
    this.setState({ expense });
  }

  handleSave() {
    console.log(this.state.expense);
    if (this.state.expense.remaining == 0) {
      const { title, amount, split } = this.state.expense;
      const ids = Object.keys(split);
      const debts = Object.values(split);
      const expense = { title, amount, ids, debts };
      this.props.addExpense(expense);
    }
  }

  logSplit() {
    const lookupTable = this.state.expense.split;
    const keys = Object.keys(lookupTable);
    for (let i = 0; i < keys.length; i++) {
      const debt = lookupTable[keys[i]];
      const id = keys[i];
      console.log(`${id} owes ${debt}`);
    }
  }

  render() {
    const { title, amount, friends, owed, remaining } = this.state.expense;
    return (
      <ExpenseForm
        title={title}
        amount={amount}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        friends={friends}
        owed={owed}
        remaining={remaining}
        handleClick={this.handleClick}
        selectedSplitOption={this.state.selectedSplitOption}
      />
    );
  }
}

Calculator.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  { addExpense }
)(Calculator);
