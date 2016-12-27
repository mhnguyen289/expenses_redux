import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { addExpense } from '../actions/expenses_actions';
import { fetchFriendsList } from '../actions/friends_actions';
import { getAllFriends } from '../reducers';
import * as options from '../constants/split_options';

class Calculator extends React.Component {
  constructor(props, context) {
    super(props, context);

    const you = { id: 999, username: 'you', owed: '' };
    const list = this.props.friends.reduce((acc, item) => {
      acc.push({ id: item.id, username: item.username, owed: '' });
      return acc;
    }, []);

    this.state = {
      you,
      list,
      selectedOptions: [],
      expenseDate: new Date().toISOString(),
      error: '',
      nameOfButtonClicked: 'exact',
      selectedSplitOption: options.SPLIT_EXACT_AMOUNT,
      options: {
        equal: options.SPLIT_EQUALLY,
        exact: options.SPLIT_EXACT_AMOUNT,
        percent: options.SPLIT_BY_PERCENT,
      },
      expense: {
        friends: [you],
        owed: '0.00',
        remaining: '0.00',
        title: '',
        amount: '',
        split: {},
      },
    };

    this.handleRemoveToken = this.handleRemoveToken.bind(this);
    this.handleAddToken = this.handleAddToken.bind(this);
    this.handleSplitButtonClick = this.handleSplitButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriendsList();
  }

  componentDidUpdate() {
    if (this.props.saved) {
      this.context.router.push('/dashboard');
    }
  }

  getInitialRemaining(selectedSplitOption, expense) {
    const byPercent = (selectedSplitOption == options.SPLIT_BY_PERCENT);
    return byPercent ? '100.00' : expense.amount;
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

  distributeRemainingCents(expense) {
    let remaining = expense.remaining;
    let owed = 0;
    expense.friends.forEach(friend => {
      if (remaining > 0) {
        owed = this.makeDecimal(Number(friend.owed));
        owed += 0.01;
        friend.owed = this.makeDecimal(owed).toString();
        remaining -= 0.01;
      }
    });
    expense.remaining = remaining.toString();
    expense.split = expense.friends.reduce((acc, item) => {
      acc[item.id] = item.owed.toString();
      return acc;
    }, {});
    return expense;
  }

  percentDistributeRemainingCents(expense) {
    const split = expense.split;
    const keys = Object.keys(expense.split);
    let totalOwed = 0;
    for (let i = 0; i < keys.length; i++) {
      totalOwed += Number(split[keys[i]]);
    }
    let remaining = Number(expense.amount) - totalOwed;
    let owed = 0;
    keys.forEach(key => {
      if (remaining > 0) {
        owed = this.makeDecimal(Number(split[key]));
        owed += 0.01;
        split[key] = this.makeDecimal(owed).toString();
        remaining -= 0.01;
      }
    });
    return expense.split;
  }

  calculateRemaining(expense, initialRemaining) {
    let totalOwed = 0;
    expense.friends.forEach((item) => {
      totalOwed += Number(item.owed);
    });
    const remaining = this.makeDecimal(Number(initialRemaining) - totalOwed);
    expense.owed = totalOwed.toString();
    expense.remaining = remaining.toString();
    return expense;
  }

  updateByCalculator(splitOption, expense) {
    expense.split = this.splitExpenses(splitOption, expense);
    expense.friends.forEach(friend => {
      friend.owed = expense.split[friend.id];
    });
    const initialRemaining = expense.amount;
    expense = this.calculateRemaining(expense, initialRemaining);
    if (expense.remaining !== 0) {
      expense = this.distributeRemainingCents(expense);
    }
    return expense;
  }

  updateByInput(splitOption, expense, friendId, owedValue) {
    expense.friends.forEach((item) => {
      if (item.id == friendId) {
        item.owed = owedValue;
      }
    });
    const initialRemaining = this.getInitialRemaining(splitOption, expense);
    expense = this.calculateRemaining(expense, initialRemaining);
    expense.split = this.splitExpenses(splitOption, expense);
    expense.split = this.percentDistributeRemainingCents(expense);
    return expense;
  }

  updateExpense(splitOption, expense, friendId, owedValue) {
    switch (splitOption) {
      case options.SPLIT_BY_PERCENT:
      case options.SPLIT_EXACT_AMOUNT:
        return this.updateByInput(splitOption, expense, friendId, owedValue);
      case options.SPLIT_EQUALLY:
        return this.updateByCalculator(splitOption, expense);
      default:
        return {};
    }
  }

  handleChange(e) {
    let expense = this.state.expense;
    const splitOption = this.state.selectedSplitOption;
    const field = e.target.name;
    if (field == 'amount') {
      expense[field] = e.target.value.trim();
    } else {
      expense[field] = e.target.value;
    }
    const friendId = e.target.name;
    const owedValue = e.target.value.trim();
    expense = this.updateExpense(splitOption, expense, friendId, owedValue);
    this.logSplit();
    this.setState({ expense });
  }

  handleSplitButtonClick(e) {
    const selectedSplitOption = this.state.options[e.target.name];
    const nameOfButtonClicked = e.target.name;
    let expense = this.state.expense;
    if (selectedSplitOption == options.SPLIT_EQUALLY) {
      expense = this.updateByCalculator(selectedSplitOption, expense);
    } else {
      const reset = expense.friends.reduce((acc, item) => {
        acc.push({ id: item.id, username: item.username, owed: '' });
        return acc;
      }, []);
      expense.friends = reset;
      expense.owed = '0.00';
      expense.remaining = this.getInitialRemaining(selectedSplitOption, expense);
    }
    this.logSplit();
    this.setState({
      nameOfButtonClicked,
      selectedSplitOption,
      expense,
    });
  }

  handleDateChange(expenseDate, formattedValue) {
    this.setState({
      expenseDate,
    });
  }

  handleRemoveToken(e) {
    const removeId = Number(e.target.name);
    console.log(removeId);
    let selectedOptions = this.state.selectedOptions;
    selectedOptions = selectedOptions.filter(item => item.id !== removeId);
    console.log(selectedOptions);

    const expense = this.state.expense;
    expense.friends = expense.friends.filter(item => item.id !== removeId);
    this.setState({ selectedOptions, expense });
  }

  handleAddToken(e) {
    const addId = Number(e.target.name);
    const selectedOptions = this.state.selectedOptions;
    const add = this.props.friends.filter(item => item.id === addId);
    const updatedOptions = selectedOptions.concat(add);
    const expense = this.state.expense;
    const exists = expense.friends.some(item => item.id === addId);
    if (!exists) {
      expense.friends = [
        ...expense.friends,
        ...add,
      ];
    }
    this.setState({ selectedOptions: updatedOptions, expense });
  }

  validForm() {
    const expenseDate = this.state.expenseDate;
    const expense = this.state.expense;
    let error = this.state.error;
    let valid = true;
    const amount = Number(expense.amount);
    if (expense.title.length < 2) {
      error = 'Enter a title (min. 2)';
    } else if (amount <= 0) {
      error = 'Enter an amount.';
    } else if (expense.friends.length <= 0) {
      error = 'Select a friend.';
    } else if (expense.remaining > 0) {
      error = 'Total remaining should be zero.';
    } else if (expenseDate.length <= 0) {
      error = 'Select an expense date.';
    } else {
      error = '';
    }
    if (error.length > 0) {
      valid = false;
    }
    this.setState({
      ...this.state,
      error,
    });
    console.log(this.state);
    return valid;
  }

  handleSave() {
    if (!this.validForm()) {
      return;
    }
    const { title, amount, split } = this.state.expense;
    const expenseDate = this.state.expenseDate;

    delete split[this.state.you.id];
    const ids = Object.keys(split);
    const debts = Object.values(split);
    const expense = { title, amount, expenseDate, ids, debts };
    this.props.addExpense(expense);
  }

  // logSplit() {
  //   const lookupTable = this.state.expense.split;
  //   const keys = Object.keys(lookupTable);
  //   for (let i = 0; i < keys.length; i++) {
  //     const debt = lookupTable[keys[i]];
  //     const id = keys[i];
  //   }
  //   console.log(`${id} owed ${debt}`);
  // }

  render() {
    const { title, amount, friends, owed, remaining } = this.state.expense;
    const { error } = this.state;
    return (
      <ExpenseForm
        title={title}
        amount={amount}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        friends={friends}
        owed={owed}
        remaining={remaining}
        handleClick={this.handleSplitButtonClick}
        selectedSplitOption={this.state.selectedSplitOption}
        error={error}
        nameOfButtonClicked={this.state.nameOfButtonClicked}
        expenseDate={this.state.expenseDate}
        handleDateChange={this.handleDateChange}
        list={this.props.friends}
        selectedOptions={this.state.selectedOptions}
        handleAddToken={this.handleAddToken}
        handleRemoveToken={this.handleRemoveToken}
      />
    );
  }
}

Calculator.contextTypes = {
  router: PropTypes.object.isRequired,
};

Calculator.propTypes = {
  fetchFriendsList: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  friends: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  saved: state.saved,
  friends: getAllFriends(state),
});

export default connect(
  mapStateToProps,
  { addExpense, fetchFriendsList }
)(Calculator);
