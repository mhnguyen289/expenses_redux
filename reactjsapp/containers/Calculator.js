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
    return Math.round((number * 100) / 100);
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

  splitExpenses(friends, amount, splitType) {
    switch (splitType) {
      case '==':
        return this.splitEqually(friends, amount);
      case '%':
        return this.splitByPercent(friends, amount);
      default:
        return {};
    }
  }

  updateSplit(expense) {
    const splitOption = '%';
    const { friends, amount } = this.state.expense;
    expense.split = this.splitExpenses(friends, amount, splitOption);
    return expense;
  }

  updateExpense(friendId, owedValue, expense) {
    expense.friends.forEach((item) => {
      if (item.id == friendId) {
        item.owed = owedValue;
      }
    });
    let total = 0;
    expense.friends.forEach((item) => {
      total += Number(item.owed);
    });
    expense.owed = total.toString();
    const remaining = this.makeDecimal(100.00 - total);
    expense.remaining = remaining.toString();

    expense = this.updateSplit(expense);
    return expense;
  }

  handleChange(e) {
    let expense = this.state.expense;
    const field = e.target.name;
    if (field == 'title' || field == 'amount') {
      expense[field] = e.target.value;
    } else {
      const friendId = e.target.name;
      const owedValue = e.target.value;
      expense = this.updateExpense(friendId, owedValue, expense);
    }
    this.setState({ expense });
  }

  handleSave() {
    console.log(this.state.expense);
    if (this.state.expense.remaining == 0) {
      const { title, amount } = this.state.expense;
      const arrays = this.makeArrays();
      const ids = arrays[0];
      const debts = arrays[1];
      const expense = { title, amount, ids, debts };
      this.props.addExpense(expense);
    }
  }

  makeArrays() {
    const lookupTable = this.state.expense.split;
    const keys = Object.keys(lookupTable);
    const ids = [];
    const debts = [];
    for (let i = 0; i < keys.length; i++) {
      const debt = lookupTable[keys[i]];
      const id = keys[i];
      console.log(`${id} owes ${debt}`);
      ids.push(id);
      debts.push(debt);
    }
    const arrays = [];
    arrays.push(ids);
    arrays.push(debts);
    return arrays;
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
