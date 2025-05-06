const boardSize = 5;
const board = document.getElementById('board');
let grid = [];

function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
        cell.addEventListener('click', () => handleClick(i));
        grid.push(cell);
    }

    // Simulate random valid moves to generate a solvable board
    for (let i = 0; i < 15; i++) {
        const randIndex = Math.floor(Math.random() * grid.length);
        simulateClick(randIndex);
    }
}

function toggle(index) {
    if (index < 0 || index >= boardSize * boardSize) return;
    grid[index].classList.toggle('is-off');
}

function getNeighbors(index) {
    const neighbors = [index];
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    if (row > 0) neighbors.push(index - boardSize);         // Top
    if (row < boardSize - 1) neighbors.push(index + boardSize); // Bottom
    if (col > 0) neighbors.push(index - 1);                  // Left
    if (col < boardSize - 1) neighbors.push(index + 1);      // Right

    return neighbors;
}

function handleClick(index) {
    const cellsToToggle = getNeighbors(index);
    cellsToToggle.forEach(toggle);
    checkWin();
}

function simulateClick(index) {
    const cellsToToggle = getNeighbors(index);
    cellsToToggle.forEach(toggle);
}

function checkWin() {
    const isWin = grid.every(cell => !cell.classList.contains('is-off'));
    if (isWin) {
        window.alert("You win!");
    }
}

createBoard();