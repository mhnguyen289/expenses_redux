import React, { PropTypes } from 'react';

const SelectInput = ({ choices, error }) => (
  <div>
    <select
      id="selectInput"
      name="choices[]"
      size={choices.length}
      multiple
      className="selectContainer"
    >
    {choices.map(t =>
      <option key={t.id} value={t.id}>
        {t.name}
      </option>
    )}
    </select>
    {error &&
      <div className="inputError">{error}</div>
    }
  </div>
);

SelectInput.propTypes = {
  choices: PropTypes.array,
  error: PropTypes.string,
};

export default SelectInput;
