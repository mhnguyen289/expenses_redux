import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { addExpense } from '../actions/expenses_actions';
import { fetchFriendsList } from '../actions/friends_actions';
import { getAllFriends } from '../reducers';
import * as options from '../constants/split_options';
import * as calcUtil from '../utils/calc';

class Calculator extends React.Component {
  constructor(props, context) {
    super(props, context);

    const you = { id: 999, username: 'you', owed: '' };
    const list = this.props.friends.reduce((acc, item) => {
      acc.push({ id: item.id, username: item.username, owed: '' });
      return acc;
    }, []);
    const splitOptions = {
      equal: options.SPLIT_EQUALLY,
      exact: options.SPLIT_EXACT_AMOUNT,
      percent: options.SPLIT_BY_PERCENT,
    };

    this.state = {
      you,
      list,
      selectedOptions: [],
      expenseDate: new Date().toISOString(),
      error: '',
      nameOfButtonClicked: 'equal',
      selectedSplitOption: options.SPLIT_EQUALLY,
      splitOptions,
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

  handleChange(e) {
    let expense = this.state.expense;
    const splitOption = this.state.selectedSplitOption;
    const field = e.target.name;
    if (field === 'amount') {
      expense[field] = e.target.value.trim();
    } else {
      expense[field] = e.target.value;
    }
    const friendId = e.target.name;
    const owedValue = e.target.value.trim();
    expense = calcUtil.updateExpense(splitOption, expense, friendId, owedValue);
    this.setState({ expense, error: '' });
  }

  handleSplitButtonClick(e) {
    const selectedSplitOption = this.state.splitOptions[e.target.name];
    const nameOfButtonClicked = e.target.name;
    let expense = this.state.expense;
    if (selectedSplitOption === options.SPLIT_EQUALLY) {
      expense = calcUtil.updateByCalculator(selectedSplitOption, expense);
    } else {
      expense = calcUtil.resetExpense(selectedSplitOption, expense);
    }
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
    let selectedOptions = this.state.selectedOptions;
    selectedOptions = selectedOptions.filter(item => item.id !== removeId);

    let expense = this.state.expense;
    expense.friends = expense.friends.filter(item => item.id !== removeId);
    const splitOption = this.state.selectedSplitOption;
    expense = calcUtil.updateExpense(splitOption, expense, removeId, '');

    this.setState({ selectedOptions, expense });
  }

  handleAddToken(e) {
    const addId = Number(e.target.name);
    let selectedOptions = this.state.selectedOptions;
    const add = this.props.friends.filter(item => item.id === addId);
    selectedOptions = selectedOptions.concat(add);
    let expense = this.state.expense;
    const exists = expense.friends.some(item => item.id === addId);
    if (!exists) {
      expense.friends = [
        ...expense.friends,
        ...add,
      ];
    }
    const splitOption = this.state.selectedSplitOption;
    expense = calcUtil.updateExpense(splitOption, expense, addId, '');

    this.setState({ selectedOptions, expense });
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
    } else if (this.state.selectedOptions.length <= 0) {
      error = 'Select who you are splitting the expense with.';
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

  render() {
    const { title, amount, friends, owed, remaining, split } = this.state.expense;
    const { error } = this.state;
    return (
      <ExpenseForm
        title={title}
        amount={amount}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        friends={friends}
        split={split}
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
