import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel } from 'react-bootstrap';

class ExpenseDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date().toISOString(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, formattedValue) {
    console.log(formattedValue);
    this.setState({
      value,
      formattedValue,
    });
  }

  render() {
    return (
      <FormGroup style={{ width: '20%' }}>
        <ControlLabel>Expense Date</ControlLabel>
        <DatePicker
          value={this.state.value}
          onChange={this.handleChange}
        />
      </FormGroup>

    );
  }
}

export default ExpenseDatePicker;
