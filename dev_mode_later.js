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

export const demo = () => (dispatch) => {
  const person = { username: 'DemoUserOne', password: 'DemoUser1Here' };
  const url = 'api/login';
  $.post(url, { user: person })
   .done(response => {
     localStorage.setItem('jwt', response.jwt);
     dispatch(loginSuccess(response.user));
   })
   .fail(error => {
     dispatch(errorLogin(error));
   });
};


export const demo = () => (dispatch) => {
  const person = { username: 'DemoUserOne', password: 'DemoUser1Here' };
  const url = 'api/login';
  const headers = new Headers({ user: person });
  const init = {
    method: 'POST',
    headers,
  };
  const request = new Request(url, init);
  fetch(request)
    .then(response => response.json())
    .then(json => {
      localStorage.setItem('jwt', json.jwt);
      dispatch(loginSuccess(json.user));
    })
    .catch(error => dispatch(errorLogin(error)));
};
