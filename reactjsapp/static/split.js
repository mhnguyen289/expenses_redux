import React from 'react';

class Static extends React.Component {

  renderWithFields() {
    return (
      <div className="with-field">
        <span className="with">With &nbsp;<strong>you</strong>&nbsp;and:</span>
        <ul className="token-input-list">
          <li className="token-input-list">
            <input
              type="text"
              autoComplete="off"
              id="token-input-add-with"
              placeholder="Enter names or email addresses"
              style={{ width: 210 }}
            />
          </li>
        </ul>
      </div>
    );
  }

  renderDescriptionAndCost() {
    return (
      <div className="body">
        <div className="main-fields">
          <img
            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/slim/uncategorized/general.png"
            className="category"
            alt=""
          />
          <input
            type="text"
            className="description"
            placeholder="Enter a description"
            value
          />
          <div className="cost-container">
            <span className="currency-code">$</span>
            <input type="text" className="cost" placeholder="0.00" value />
          </div>
        </div>
        <div className="human-summary">
          Paid by <a className="payer">you</a> and split <a className="split">equally</a>
          <div className="details">($0.00/person)</div>
        </div>
      </div>
    );
  }

  renderAddNotes() {
    return (
      <div className="main-window">
        <header>Add a bill <a className="dismiss" href="#">x</a></header>
        {this.renderWithFields()}
        {this.renderDescriptionAndCost()}
        <footer>
          <button className="btn btn-large btn-cancel">Cancel</button>
          <button className="btn btn-large btn-min submit">Save</button>
        </footer>
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
      <div className="split-method-equal" style={{ display: 'block' }}>
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
            <span className="currency-symbol">$</span>
            <input type="text" value />
          </div>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="person">
          <div className="input-prepend">
            <span className="add-on currency-symbol">$</span>
            <input type="text" value />
          </div>
          <span className="name"><strong>jennyfen</strong></span>
        </div>
        <div className="totals">
          <strong>Total</strong>
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
      <div className="split-method-percent" style={{ display: 'none' }}>
        <h3>Split by percentages</h3>
        <div className="person">
          <div className="input-append">
            <input type="text" value />
            <span className="add-on">%</span>
          </div>
          <span className="name"><strong>cod3r99</strong></span>
        </div>
        <div className="person">
          <div className="input-append">
            <input type="text" value />
            <span className="add-on">%</span>
          </div>
          <span className="name"><strong>jennyfen</strong></span>
        </div>
        <div className="totals">
          <strong>Total</strong>
          <div className="subtotals">
            <span className="owed-total">0.00%</span>
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
        <header>Choose split options<a className="dismiss" href="#">x</a></header>
        <div className="body">
          {this.renderSplitOptionsButtons()}
          {this.renderSplitEqual()}
          {this.renderSplitByExactAmount()}
          {this.renderSplitByPercent()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="app-header">
          <div className="constraint-width">
            <div>Header Here</div>
          </div>
        </div>
        <div>
          <div className="main-section constraint-width">
            <div className="content">
              <div className="box">
                <div className="relative-container">
                  {this.renderAddNotes()}
                  {this.renderChooseSplit()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Static;
