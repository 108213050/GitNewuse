import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Square
// Board
// Game 
function Square (props) {
  return (
    <button 
    className="square"  
    // 從 Board 傳兩個 prop 給 Square：value 和 onClick
    onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    // constuctor 
    this.state ={
      // 初始9個squre的 state: null
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  // 當被點擊時
  // 讓「X」和「O」輪流出現
  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X':'O';
    console.log('handle Click!, Trun Next Player ');
    this.setState({
      squares: squares,
      // 翻轉 xIsNext 的值
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    // 把名為 value 的 prop 傳給 Square
    return (
      <Square 
      value={this.state.squares[i]} 
      onClick={()=> this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: '+ (this.state.xIsNext ? 'X':'O');
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(22)}
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

class Game extends React.Component {
  render() {
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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
