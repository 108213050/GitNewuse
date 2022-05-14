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
    // 假如已經分出勝負 OR 已經被填滿
    if (calculateWinner(squares) || squares[i]){
      return;
    }
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
    // 確認是否有贏家產生
    const Winner = calculateWinner(this.state.squares);
    let status;
    if(Winner){
      status = 'Winner: '+ Winner;
    }else{
      status = 'Next player: '+ (this.state.xIsNext ?'X' : 'O');
    }

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

// 檢查玩家 & 依據需要 傳回 X,O,null
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