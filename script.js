let currentPlayer = 'x';
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player1').value;
  player2 = document.getElementById('player2').value;

  if (player1 && player2) {
    document.getElementById('player-input').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    updateMessage();
    createBoard();
  }
});

function updateMessage(winner = null) {
  const messageDiv = document.querySelector('.message');
  if (winner) {
    messageDiv.textContent = `${winner} congratulations you won!`;
  } else {
    const player = currentPlayer === 'x' ? player1 : player2;
    messageDiv.textContent = `${player}, you're up`;
  }
}

function createBoard() {
  const boardDiv = document.querySelector('.board');
  boardDiv.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.id = i + 1;
    cell.addEventListener('click', () => handleMove(i));
    boardDiv.appendChild(cell);
  }
}

function handleMove(index) {
  if (board[index] !== '' || gameOver) return;

  board[index] = currentPlayer;
  const cell = document.getElementById(index + 1);
  cell.textContent = currentPlayer;

  const winningPattern = checkWin();
  if (winningPattern) {
    const winner = currentPlayer === 'x' ? player1 : player2;
    updateMessage(winner);
    highlightWinningCells(winningPattern); // pass pattern directly
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  updateMessage();
}


const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return pattern; // return the winning pattern
    }
  }
  return null;
}


function highlightWinningCells(pattern) {
  for (let index of pattern) {
    document.getElementById(index + 1).classList.add('win');
  }
}

