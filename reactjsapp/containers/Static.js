import React from 'react';

class Static extends React.Component {
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
                <div className="modal fade transparent in" id="add_bill"
                     style={{width: 352, marginLeft: -176, display: block}}>
                  <div className="relative-container">
                    <div className="main-window">
                      <header>
                        Add a bill
                        <a className="dismiss" href="#">x</a>
                      </header>
                      <div className="with-field">
                        <span className="with">With &nbsp;<strong>you</strong>&nbsp;and:</span>
                        <ul className="token-input-list">
                          <li className="token-input-list">
                            <input type="text"
                              autocomplete="off"
                              id="token-input-add-with"
                              placeholder="Enter names or email addresses"
                              style={{outline: none, width: 210}}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="body">
                        <div className="main-fields">
                          <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/slim/uncategorized/general.png" class="category" />
                          <input type="text" class="description" placeholder="Enter a description" value="" style="font-size: 20px;" />
                          <div className="cost-container">
                            <span class="currency-code">$</span>
                            <input type="text" className="cost" placeholder="0.00" value />
                          </div>
                        </div>
                        <div className="human-summary">
                          Paid by
                          <a className="payer">you</a>
                          and split
                          <a className="split">equally</a>
                          <div className="details">($0.00/person)</div>
                        </div>
                      </div>
                      <footer>
                        <button className="btn btn-large btn-cancel">Cancel</button>
                        <button className="btn btn-large btn-min submit">Save</button>
                      </footer>
                    </div>
                    <div className="subview" id="add_notes">

                    </div>
                    <div className="subview active" id="choose_split">
                      <header>
                        Choose split options
                        <a className="dismiss" href="#">x</a>
                      </header>
                      <div className="body">
                        <div className="split-details">
                          <div class="btn-group btn-group-inline" id="split_method">
                            <button class="split_button btn btn-gray equal active">=</button>
                            <button class="split_button btn btn-gray unequal">1.23</button>
                            <button class="split_button btn btn-gray percent">%</button>
                          </div>
                        </div>
                        <div className="split-method-equal" style={{display: block}}>
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
                        <div className="split-method-unequal" style={{display: none}}>
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
                            <strong style={{textTransform: uppercase}}>Total</strong>
                            <div className="subtotals">
                              <span className="owed-total">$0.00</span>
                              <div className="remaining">
                                <span className="owed-remaining">$0.00 left</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="split-method-percent" style={{display: none}}>
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
                            <strong style={{textTransform: uppercase}}>Total</strong>
                            <div className="subtotals">
                              <span className="owed-total">0.00%</span>
                              <div className="remaining">
                                <span className="owed-remaining">100.00% left</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
