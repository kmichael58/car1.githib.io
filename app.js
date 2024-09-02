const gameArea = document.querySelector('.game-area');
const playerCar = document.getElementById('playerCar');
const scoreDisplay = document.getElementById('score');

let gameInterval;
let score = 0;
let gameOver = false;

document.addEventListener('keydown', moveCar);

function moveCar(e) {
  const carPosition = playerCar.offsetLeft;
  if (e.key === 'ArrowLeft' && carPosition > 10) {
    playerCar.style.left = carPosition - 50 + 'px';
  } else if (e.key === 'ArrowRight' && carPosition < 340) {
    playerCar.style.left = carPosition + 50 + 'px';
  }
}

function startGame() {
  gameInterval = setInterval(() => {
    if (!gameOver) {
      score++;
      scoreDisplay.innerText = score;
      generateObstacle();
    }
  }, 1000);
}

function generateObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.floor(Math.random() * 350) + 'px';
  obstacle.style.top = '-100px';
  gameArea.appendChild(obstacle);

  moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
  let obstacleInterval = setInterval(() => {
    const obstacleTop = parseInt(obstacle.style.top);
    obstacle.style.top = obstacleTop + 5 + 'px';

    // Check collision
    if (detectCollision(obstacle)) {
      clearInterval(obstacleInterval);
      gameOver = true;
      clearInterval(gameInterval);
      alert('Game Over! Your score: ' + score);
      resetGame();
    }

    if (obstacleTop > 600) {
      clearInterval(obstacleInterval);
      gameArea.removeChild(obstacle);
    }
  }, 20);
}

function detectCollision(obstacle) {
  const carRect = playerCar.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return !(
    carRect.bottom < obstacleRect.top ||
    carRect.top > obstacleRect.bottom ||
    carRect.right < obstacleRect.left ||
    carRect.left > obstacleRect.right
  );
}

function resetGame() {
  score = 0;
  scoreDisplay.innerText = score;
  gameOver = false;
  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
  startGame();
}

startGame();

const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const startButton = document.getElementById('startButton');



document.addEventListener('keydown', moveCar);
leftButton.addEventListener('click', moveCarLeft);
rightButton.addEventListener('click', moveCarRight);
startButton.addEventListener('click', startGame);

function moveCar(e) {
  const carPosition = playerCar.offsetLeft;
  if (e.key === 'ArrowLeft' && carPosition > 10) {
    playerCar.style.left = carPosition - 50 + 'px';
  } else if (e.key === 'ArrowRight' && carPosition < 340) {
    playerCar.style.left = carPosition + 50 + 'px';
  }
}

function moveCarLeft() {
  const carPosition = playerCar.offsetLeft;
  if (carPosition > 10) {
    playerCar.style.left = carPosition - 50 + 'px';
  }
}

function moveCarRight() {
  const carPosition = playerCar.offsetLeft;
  if (carPosition < 340) {
    playerCar.style.left = carPosition + 50 + 'px';
  }
}

function startGame() {
  resetGame(); // Reset the game before starting
  gameInterval = setInterval(() => {
    if (!gameOver) {
      score++;
      scoreDisplay.innerText = score;
      generateObstacle();
    }
  }, 1000);
}

function generateObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.floor(Math.random() * 350) + 'px';
  obstacle.style.top = '-100px';
  gameArea.appendChild(obstacle);

  moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
  let obstacleInterval = setInterval(() => {
    const obstacleTop = parseInt(obstacle.style.top);
    obstacle.style.top = obstacleTop + 5 + 'px';

    // Check collision
    if (detectCollision(obstacle)) {
      clearInterval(obstacleInterval);
      gameOver = true;
      clearInterval(gameInterval);
      alert('Game Over! Your score: ' + score);
    }

    if (obstacleTop > 600) {
      clearInterval(obstacleInterval);
      gameArea.removeChild(obstacle);
    }
  }, 20);
}

function detectCollision(obstacle) {
  const carRect = playerCar.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return !(
    carRect.bottom < obstacleRect.top ||
    carRect.top > obstacleRect.bottom ||
    carRect.right < obstacleRect.left ||
    carRect.left > obstacleRect.right
  );
}

function resetGame() {
  score = 0;
  scoreDisplay.innerText = score;
  gameOver = false;
  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
}
