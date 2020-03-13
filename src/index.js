import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// this square component renders a single square or button.
// returns the indexed value of the prop when clicked (this.prop.value).
class Square extends React.Component {
    // react component can define states by setting this.state in constructors.
    // this code adds constructor to the class to init the state.
    // always call super when defining the constructor of subclass.
    // All React component classes that have a constructor 
    // should start with a super(props) call. 
    constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
      return (
        // adds an onClick listener function to each button as onClick prop
        // this.setState tells react to re-render the square when button is clicked
        // this.state.value displays whatever the parameter of this.setState 
        // when using the keyword "this" with traditional function may get error because 
        // there are different values based on the context which it is called, solution is 
        // to add ".bind(this) to end of function code block or use arrow function (lexically bound)
        <button 
        className="square" 
        onClick={function() {this.setState({value: 'X'})}.bind(this)}
        >
          {this.state.value}
        </button>
      );
    }
}

//   this board component renders 9 squares buttons 
  class Board extends React.Component {
    renderSquare(i) {
        // returns components of the square class at value indexed  
      return <Square value={i} />;
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