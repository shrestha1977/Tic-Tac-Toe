let gameMode = null;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

function setMode(mode) {
  gameMode = mode;
  document.getElementById('nameInputs').style.display = mode === 'pvp' ? 'block' : 'none';
  document.getElementById('startGame').style.display = 'inline-block';
}

function startGame() {
  const playerX = document.getElementById('playerX').value || 'Player X';
  const playerO = document.getElementById('playerO').value || 'Player O';

  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  document.getElementById('playerTurn').textContent = `Turn: ${currentPlayer === 'X' ? playerX : playerO}`;
  drawBoard();
}

function drawBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';
  board.forEach((cell, index) => {
    const cellEl = document.createElement('div');
    cellEl.className = `cell ${cell ? 'taken' : ''}`;
    cellEl.textContent = cell;
    if (!cell) {
      cellEl.addEventListener('click', () => handleMove(index));
    }
    boardEl.appendChild(cellEl);
  });
}

function handleMove(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  drawBoard();
  checkWinner();

  if (!isGameOver) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnDisplay();

    if (gameMode === 'ai' && currentPlayer === 'O') {
      setTimeout(aiMove, 500);
    }
  }
}

function updateTurnDisplay() {
  const playerX = document.getElementById('playerX').value || 'Player X';
  const playerO = document.getElementById('playerO').value || 'Player O';
  document.getElementById('playerTurn').textContent = `Turn: ${currentPlayer === 'X' ? playerX : playerO}`;
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      document.getElementById('result').textContent = `${board[a]} wins!`;
      isGameOver = true;
      return;
    }
  }

  if (!board.includes('')) {
    document.getElementById('result').textContent = `It's a draw!`;
    isGameOver = true;
  }
}

function aiMove() {
  let empty = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
  let move = empty[Math.floor(Math.random() * empty.length)];
  board[move] = 'O';
  drawBoard();
  checkWinner();
  if (!isGameOver) {
    currentPlayer = 'X';
    updateTurnDisplay();
  }
}

function resetToMenu() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  document.getElementById('result').textContent = '';
  document.getElementById('menu').style.display = 'block';
  document.getElementById('game').style.display = 'none';
}
