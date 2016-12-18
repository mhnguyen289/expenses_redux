import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        allMemberIds: [2, 3, 5],
        members: [
          {id: 2, username: 'cod3r99'},
          {id: 3, username: 'jennyfen'},
          {id: 5, username: 'billy'}
        ],
        title: '',
        amount: 0,
        percentages: [],
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
    const palsIds = this.state.expense.allMemberIds;
    const amount = expense.amount;
    const splitOption = '%';

    const percentages = [10.00, 30.00, 60.00];
    expense.split = this.splitExpenses(palsIds, amount, splitOption, percentages);

    this.setState({ expense });
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

  renderDescriptionAndCost() {
    return (
      <div className="body">
        <div className="main-fields">
          <input
            type="text"
            value={this.state.expense.title}
            name="title"
            className="description"
            placeholder="Title"
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
      <div className="add-notes">
        <header>ADD A BILL</header>
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
        <div className="text subtle person">
          <span className="amount">$0.00</span>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="text subtle person">
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
        <div className="text subtle person">
          <div className="input-prepend">
            <span>$&nbsp;</span>
            <input type="text" value="" />
          </div>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="text subtle person">
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
      <div className="split-method-percent">
        <h3>Split by percentages</h3>
        <ul>
          {this.state.expense.members.map(m =>
            <li key={m.id}>
              <div className="person">
                <span className="name"><strong>{m.username}</strong></span>
                <div className="amount">
                  <input
                    name={m.username}
                    type="text"
                    value=""
                  />
                  <span className="add-on">&nbsp;%</span>
                </div>
              </div>
            </li>
          )}
        </ul>
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

  handleSave(e) {
    console.log(this.state.expense)
  }

  renderSaveButtonFooter() {
    return (
      <footer>
        <button className="btn btn-large btn-cancel">Cancel</button>
        <button
          onClick={this.handleSave}
          className="btn btn-large btn-min submit">
          Save
        </button>
      </footer>
    );
  }

  render() {
    return (
      <div className="add container">
        <div className="add-bill">
          {this.renderAddNotes()}
          {this.renderChooseSplit()}
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
