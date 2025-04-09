const submitBtn = document.getElementById("submit");
    const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const inputSection = document.getElementById("input-section");
    const gameSection = document.getElementById("game-section");
    const messageDiv = document.querySelector(".message");
    const boardDiv = document.getElementById("board");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "x";
    let gameActive = true;
    const cells = Array(9).fill(null);

    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function checkWinner() {
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          return true;
        }
      }
      return false;
    }

    function handleCellClick(e) {
      const id = parseInt(e.target.id) - 1;
      if (!gameActive || cells[id]) return;

      cells[id] = currentSymbol;
      e.target.textContent = currentSymbol;

      if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
      }

      currentSymbol = currentSymbol === "x" ? "o" : "x";
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up`;
    }

    function startGame() {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();
      if (!player1 || !player2) {
        alert("Please enter both player names.");
        return;
      }

      inputSection.classList.add("hidden");
      gameSection.classList.remove("hidden");
      currentPlayer = player1;
      messageDiv.textContent = `${currentPlayer}, you're up`;

      for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.addEventListener("click", handleCellClick);
        boardDiv.appendChild(cell);
      }
    }

    submitBtn.addEventListener("click", startGame);