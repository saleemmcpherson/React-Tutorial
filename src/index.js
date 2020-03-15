import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// this square function component renders a single square or button.
// returns the value of the prop when clicked (prop.value).
function Square(props) {
      return ( 
        // adds an onClick listener function to each button as onClick prop
        // When the square is clicked the onClick function from the Board is invoked 
        // Each square onClick prop is now specified by the board
        // The square now calls this.handleClick from the Board 
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
}

// this board component renders 9 squares buttons 
// by adding this code the state of the squares are managed by the board 
// instead of individual squares. When the board state changes the square 
// re-renders automatically. Used (.slice()) to create copy of the squares array
// turnary operator for taking turns between "X" and "O"
// when x is not next place o
  class Board extends React.Component {
    renderSquare(i) {
        // instructing each square to hold value its current value 
        // either "X", "O" or null for available or empty square.
        // because state is private to the component the defines it 
        // this onClick passes function from board to the square and 
        // the square updates board when it has been clicked  
        // when using the keyword "this" with traditional function may get error because 
        // there are different values based on the context which it is called, solution is 
        // to add ".bind(this) to end of function code block or use arrow function (lexically bound)
      return (
      <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
//   this component renders a board with placeholder values
  class Game extends React.Component {
    // react component can define states by setting this.state in constructors.
    // this code adds constructor to the class to init the state.
    // always call super when defining the constructor of subclass.
    // All React component classes that have a constructor 
    // should start with a super(props) call. 
    // add constructor to the board setting each square to null value 
    // corresponding to each position in array  
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            // boolean sets "X" as initial state of game
            xIsNext: true,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]; 
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        // returns board component class 
        // use the most recent history entry 
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const description = move ?
            "Go to move #" + move : "Go to start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            );
        });

        let status;
        if(winner){
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
//   ReactDom actually renders the game board to the page 
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }