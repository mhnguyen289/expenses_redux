

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
