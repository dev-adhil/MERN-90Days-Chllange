const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const toggleBtn = document.getElementById('themeToggle');


const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    toggleBtn.textContent = '🌙';
  } else {
    toggleBtn.textContent = '☀️';
  }
});

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    board.appendChild(cell);
  }
}
createBoard();

function draw() {
  const cells = board.children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("snake", "food");
  }

  snake.forEach((part) => {
    const index = part.y * boardSize + part.x;
    if (cells[index]) cells[index].classList.add("snake");
  });

  const foodIndex = food.y * boardSize + food.x;
  if (cells[foodIndex]) cells[foodIndex].classList.add("food");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (e.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (e.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (e.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  snake.pop();
}

function checkFoodCollision() {
  const head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    const tail = snake[snake.length - 1];
    snake.push({ ...tail });
    food = generateFood();
  }
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function gameOver() {
  clearInterval(gameInterval);
  alert("💀 Game Over! Your Score: " + score);
}

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    gameOver();
    return;
  }
  checkFoodCollision();
  draw();
}

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 200);
}

restartBtn.addEventListener("click", () => {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = score;
  startGame();
});

draw();
startGame();
