import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
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
      acc[item] = Math.round(amount / array.length * 100) / 100;
      return acc;
    }, {});

    return split;
  }

  splitByPercent(pals, amount, percentages) {
    let idx = 0;
    const split = pals.reduce((acc, item) => {
      acc[item] = amount * percentages[idx];
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

  // todo : validate amount is number positive number
  // todo : split options : this.splitExpenses(pals, amount, '=='));
  handleChange(e) {
    const expense = this.state.expense;
    const field = e.target.name;
    expense[field] = e.target.value;

    const amount = expense.amount;
    const splitOption = '%';
    const pals = [2, 3, 5];
    const percentages = [0.32, 0.39, 0.31];
    expense.split = this.splitExpenses(pals, amount, splitOption, percentages);

    this.setState({ expense });
  }

  handleSave(e) {

  }

  renderSplit() {
    const lookupTable = this.state.expense.split;
    const keys = Object.keys(lookupTable);
    const array = [];
    for (let i = 0; i < keys.length; i++) {
      const amount = lookupTable[keys[i]];
      const person = keys[i];
      console.log(`${person} owes ${amount}`);
      array.push({ id: i, person, amount });
    }
    return (
      <ul>
        {array.map(debt =>
          <li key={debt.id}>{debt.person} owes {debt.amount} </li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h3>Add Expense</h3>
        <input
          type="text"
          value={this.state.expense.title}
          name="title"
          placeholder="Enter expense title"
          onChange={this.handleChange}
        />
        <input
          type="text"
          value={this.state.expense.amount}
          name="amount"
          placeholder="Enter expense amount"
          onChange={this.handleChange}
        />
        <div>
          <h3>Split equally among </h3>
          {this.renderSplit()}
        </div>
      </div>
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
