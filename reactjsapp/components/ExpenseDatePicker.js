import React, { PropTypes } from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel } from 'react-bootstrap';

const ExpenseDatePicker = ({ expenseDate, handleDateChange }) => (
  <FormGroup style={{ width: '70%', marginTop: 30 }}>
    <ControlLabel>Expense Date</ControlLabel>
    <DatePicker
      showClearButton="false"
      value={expenseDate}
      onChange={handleDateChange}
    />
  </FormGroup>
);

ExpenseDatePicker.propTypes = {
  expenseDate: PropTypes.string,
  handleDateChange: PropTypes.func,
};

export default ExpenseDatePicker;
