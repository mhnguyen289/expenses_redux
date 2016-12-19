import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        friends: [
          { id: 2, username: 'andy', owed: 60.00 },
          { id: 3, username: 'bonnie', owed: 40.00 },
        ],
        owed: 100.00,
        remaining: 0.00,
        title: '',
        amount: 0,
        split: {},
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  splitEqually(pals, amount) {
    const split = pals.reduce((acc, item, index, array) => {
      acc[item] = (amount / array.length * 100) / 100;
      return acc;
    }, {});

    return split;
  }

  splitByPercent(pals, amount, percentages) {
    let idx = 0;
    const split = pals.reduce((acc, item) => {
      acc[item] = (amount * percentages[idx] * 100) / 100;
      idx += 1;
      return acc;
    }, {});

    return split;
  }

  splitExpenses(pals, amount, splitType, percentages) {
    switch (splitType) {
      case '==':
        return this.splitEqually(pals, amount);
      case '%':
        return this.splitByPercent(pals, amount, percentages);
      default:
        return {};
    }
  }

  updateUIFields(event, expense) {
    const field = event.target.name;
    expense[field] = event.target.value;

    return expense;
  }

  updateOwed(expense) {
    const id = '2';
    const owed = 55.56; // %
    expense.friends.forEach((item) => {
      if (item.id == id) {
        item.owed = owed;
      }
    });
    let total = 0;
    expense.friends.forEach((item) => {
      total += item.owed;
    });
    expense.owed = total;
    expense.remaining = Math.round((100.00 - total) * 100) / 100;

    return expense;
  }

  updateSplitAmount(expense) {
    const splitOption = '%';
    const friends = expense.friends;
    const amount = expense.amount;
    const owed = expense.owed;
    expense.split = this.splitExpenses(friends, amount, splitOption, owed);

    return expense;
  }

  handleChange(event) {
    let expense = this.state.expense;
    expense = this.updateUIFields(event, expense);
    expense = this.updateOwed(expense);
    expense = this.updateSplitAmount(expense);

    this.setState({ expense });
  }

  handleSave(e) {
    console.log(this.state.expense);
  }

  render() {
    const expense = this.state.expense;
    return (
      <ExpenseForm
        title={expense.title}
        amount={expense.amount}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        friends={expense.friends}
        owed={expense.owed}
        remaining={expense.remaining}
      />
    );
  }
}

Calculator.propTypes = {

};

const mapStateToProps = (state) => ({

});

export default connect(
  mapStateToProps,
  {}
)(Calculator);
