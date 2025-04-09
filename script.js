const startButton = document.getElementById("submit");
const inputSection = document.getElementById("input-section");
const gameSection = document.querySelector(".game");
const message = document.querySelector(".message");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "";
let player1 = "";
let player2 = "";
let turn = 0; // 0 = player1 (X), 1 = player2 (O)
let gameOver = false;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

startButton.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (player1 && player2) {
    currentPlayer = player1;
    inputSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    message.textContent = `${currentPlayer}, you're up`;
  } else {
    alert("Please enter names for both players!");
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || gameOver) return;

    const mark = turn % 2 === 0 ? "X" : "O";
    cell.textContent = mark;

    if (checkWin(mark)) {
      gameOver = true;
      message.textContent = `${currentPlayer}, congratulations you won!`;
    } else if (turn === 8) {
      gameOver = true;
      message.textContent = "It's a draw!";
    } else {
      turn++;
      currentPlayer = turn % 2 === 0 ? player1 : player2;
      message.textContent = `${currentPlayer}, you're up`;
    }
  });
});

function checkWin(mark) {
  return winCombos.some(combo => {
    const win = combo.every(index => cells[index].textContent === mark);
    if (win) {
      combo.forEach(index => cells[index].classList.add("winning"));
    }
    return win;
  });
}
