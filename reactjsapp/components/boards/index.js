import React from 'react';
import Token from './Token';
import Options from './Options';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const friends = [
      { id: 2, username: 'andy123' },
      { id: 3, username: 'bonnie' },
      { id: 4, username: 'jamiek' },
      { id: 5, username: 'jeffrey' },
    ];
    return (
      <div>
        <Options
          list={friends}
        />
      </div>
    );
  }
}

export default Board;
