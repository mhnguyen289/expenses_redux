import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { splitExpenses } from '../actions/calculator_actions';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        title: '',
        amount: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  log(lookup) {
    const keys = Object.keys(lookup);
    for (const i = 0; i < keys.length; i++) {
      const amount = lookup[keys[i]];
      const person = keys[i];
      console.log(`${person} owes ${amount}`);
    }
  }

  handleChange(e) {
    const expense = this.state.expense;
    const field = e.target.name;
    expense[field] = e.target.value;
    this.setState({ expense });

    const { splitExpenses } = this.props;
    const pals = [2, 3, 5];
    const percentages = [0.32, 0.39, 0.31];
    log(splitExpenses(pals, 350, "%", percentages));
    log(splitExpenses(pals, 350, "=="));
  }

  handleSave(e) {

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


        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(
  mapStateToProps,
  { splitExpenses }
)(Calculator);
