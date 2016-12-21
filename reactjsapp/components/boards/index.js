import React from 'react';
import Token from './Token';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    console.log('remove token');
  }

  render() {
    return (   
      <div>
        <Token
          value="Friend"
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default Board;
