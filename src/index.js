import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// this square component renders a single square or button.
// returns the indexed value of the prop when clicked (this.prop.value).
class Square extends React.Component {
    render() {
      return (
        // adds an onClick listener function to each button as onClick prop
        // when using the keyword "this" with traditional function may get error because 
        // there are different values based on the context which it is called, solution is 
        // to add ".bind(this) to end of function code block or use arrow function (lexically bound)
        // When the square is clicked the onClick function from the Board is invoked 
        // Each square onClick prop is now specified by the board
        // The square now calls this.handleClick from the Board 
        <button 
        className="square" 
        onClick={function() {this.props.onClick()}.bind(this)}
        >
          {this.props.value}
        </button>
      );
    }
}

//   this board component renders 9 squares buttons 
  class Board extends React.Component {
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
              squares: Array(9).fill(null),
          };
      }

    // by adding this code the state of the squares are managed by the board 
    // instead of individual squares. When the board state changes the square 
    // re-renders automatically. Used (.slice()) to create copy of the squares array
      handleClick(i){
          const squares = this.state.squares.slice();
          squares[i] = 'X';
          this.setState({squares: squares});
      }

    renderSquare(i) {
        // instructing each square to hold value its current value 
        // either "X", "O" or null for available or empty square.
        // because state is private to the component the defines it 
        // this onClick passes function from board to the square and 
        // the square updates board when it has been clicked  
      return (
      <Square 
      value={this.state.squares[i]} 
      onClick={function(){this.handleClick(i)}.bind(this)}
      />
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
        // returns board component class 
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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