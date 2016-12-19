import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { addExpense } from '../actions/expenses_actions';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        friends: [
          { id: 2, username: 'andy', owed: '' },
          { id: 3, username: 'bonnie', owed: '' },
        ],
        owed: '0.00',
        remaining: '100.00',
        title: '',
        amount: '',
        split: {},
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  makeDecimal(number) {
    return (number * 100) / 100;
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

  splitByPercent(friends, amount) {
    const split = friends.reduce((acc, item) => {
      acc[item.id] = this.makeDecimal(amount * item.owed / 100);
      return acc;
    }, {});
    return split;
  }

  splitExpenses(splitType, friends, amount) {
    switch (splitType) {
      case '==':
        return this.splitEqually(friends, amount);
      case '%':
        return this.splitByPercent(friends, amount);
      case '1.23':
        return this.splitByExactAmount(friends);
      default:
        return {};
    }
  }

  updateSplit(expense, splitOption) {
    const { friends, amount } = this.state.expense;
    expense.split = this.splitExpenses(splitOption, friends, amount);
    return expense;
  }

  updateRemaining(amount, friendId, owedValue, expense) {
    let total = 0;
    expense.friends.forEach((item) => {
      total += Number(item.owed);
    });
    expense.owed = total.toString();
    const remaining = this.makeDecimal(amount - total);
    expense.remaining = remaining.toString();
    return expense;
  }

  updateOwedRemaining(splitType, friendId, owedValue, expense) {
    expense.friends.forEach((item) => {
      if (item.id == friendId) {
        item.owed = owedValue;
      }
    });
    let amount = 0;
    switch (splitType) {
      case '%':
        amount = 100.00;
        break;
      default:
        amount = expense.amount;
    }
    expense = this.updateRemaining(amount, friendId, owedValue, expense);
    return expense;
  }

  handleChange(e) {
    let expense = this.state.expense;
    const field = e.target.name;
    expense[field] = e.target.value;
    const friendId = e.target.name;
    const owedValue = e.target.value;
    expense = this.updateOwedRemaining('%', friendId, owedValue, expense);
    expense = this.updateSplit('%', expense);
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
