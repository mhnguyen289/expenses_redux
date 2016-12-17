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
      array.push({ id: i, person, amount });
    }
    return (
      <ul>
        {array.map(debt =>
          <li key={debt.id}>{debt.person} owes ${debt.amount} </li>
        )}
      </ul>
    );
  }

  renderWithFields() {
    return (
      <div className="with-field">
        <span className="with">With &nbsp;<strong>you</strong>&nbsp;and:</span>
      </div>
    );
  }

  renderDescriptionAndCost() {
    return (
      <div className="body">
        <div className="main-fields">
          <input
            type="text"
            value={this.state.expense.title}
            name="title"
            className="description"
            placeholder="Enter a description"
            onChange={this.handleChange}
          />
          <div className="cost-container">
            <span className="currency-code">$</span>
            <input
              type="text"
              value={this.state.expense.amount}
              name="amount"
              className="cost"
              placeholder="0.00"
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }

  renderAddNotes() {
    return (
      <div className="main-window">
        <header>ADD A BILL</header>
        {this.renderWithFields()}
        {this.renderDescriptionAndCost()}
      </div>
    );
  }

  renderSplitOptionsButtons() {
    return (
      <div className="split-details">
        <div className="btn-group btn-group-inline" id="split-method">
          <button className="split_button btn btn-gray equal active">=</button>
          <button className="split_button btn btn-gray unequal">1.23</button>
          <button className="split_button btn btn-gray percent">%</button>
        </div>
      </div>
    );
  }

  renderSplitEqual() {
    return (
      <div className="split-method-equal" style={{ display: 'none' }}>
        <h3>Split equally</h3>
        <div className="person">
          <span className="amount">$0.00</span>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="person">
          <span className="amount">$0.00</span>
          <span className="name"><strong>jennyfen</strong></span>
        </div>
      </div>
    );
  }

  renderSplitByExactAmount() {
    return (
      <div className="split-method-unequal" style={{ display: 'none' }}>
        <h3>Split by exact amounts</h3>
        <div className="person">
          <div className="input-prepend">
            <span>$&nbsp;</span>
            <input type="text" value="" />
          </div>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="person">
          <div className="input-prepend">
            <span>$&nbsp;</span>
            <input type="text" value="" />
          </div>
          <span className="name"><strong>jennyfen</strong></span>
        </div>
        <div className="totals">
          <strong>TOTAL</strong>
          <div className="subtotals">
            <span className="owed-total">$0.00</span>
            <div className="remaining">
              <span className="owed-remaining">$0.00 left</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSplitByPercent() {
    return (
      <div className="split-method-percent" style={{ display: 'block' }}>
        <h3>Split by percentages</h3>
        <div className="person">
          <div className="input-append">
            <input type="text" value="" />
            <span className="add-on">&nbsp;%</span>
          </div>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="person">
          <div className="input-append">
            <input type="text" value="" />
            <span className="add-on">&nbsp;%</span>
          </div>
          <span className="name"><strong>jennyfen</strong></span>
        </div>
        <div className="totals">
          <strong>TOTAL</strong>
          <div className="subtotals">
            <span className="owed-total">0.00 %</span>
            <div className="remaining">
              <span className="owed-remaining">100.00% left</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderChooseSplit() {
    return (
      <div className="subview active" id="choose-split">
        <div className="body">
          {this.renderSplitOptionsButtons()}
          {this.renderSplitEqual()}
          {this.renderSplitByExactAmount()}
          {this.renderSplitByPercent()}
          {this.renderSaveButtonFooter()}
        </div>
      </div>
    );
  }

  renderSaveButtonFooter() {
    return (
      <footer>
        <button className="btn btn-large btn-cancel">Cancel</button>
        <button className="btn btn-large btn-min submit">Save</button>
      </footer>
    );
  }

  render() {
    return (
      <div className="relative-container">
        {this.renderAddNotes()}
        {this.renderChooseSplit()}
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
