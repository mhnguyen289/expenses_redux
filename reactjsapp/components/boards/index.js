import React from 'react';
import Token from './Token';
import Options from './Options';

class Board extends React.Component {

  render() {
    const friends = [
      { id: 2, username: 'andy123' },
      { id: 3, username: 'bonnie' },
      { id: 4, username: 'jamiek' },
      { id: 5, username: 'jeffrey' },
    ];
    return (
      <div>
        <Options list={friends} />
      </div>
    );
    return (
      <div>
        Stub
      </div>
    );
  }
}

export default Board;
