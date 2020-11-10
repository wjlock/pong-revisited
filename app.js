const game = document.querySelector("#game");
let gameStatus = false;
let playerScore = 0;
let computerScore = 0;
let lastRoundWinner = "Computer";
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const playButton = document.getElementById("play-button");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

// syncing canvas's internal height/width
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
game.height = height.replace("px", "");
game.width = width.replace("px", "");
const ctx = game.getContext("2d");

//constructor for paddles (player and AI)

class Paddle {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.speed = 5.7;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

//constructor for ball
class Ball {
  constructor(x, y, color, height, width) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Render paddles and ball
let playerHuman = new Paddle(15, 250, "slategrey", 10, 100);
let playerComputer = new Paddle(675, 250, "slategrey", 10, 100);
let ball = new Ball(350, 294, "slategrey", 12, 12);

// Handle player paddle movement, event listeners
document.addEventListener("keydown", function (evt) {
  if (evt.key === "w") {
    playerHuman.y_speed = -5;
  } else if (evt.key === "s") {
    playerHuman.y_speed = 5;
  }
});
document.addEventListener("keyup", function (evt) {
  if (evt.key === "w") {
    playerHuman.y_speed = 0;
  } else if (evt.key === "s") {
    playerHuman.y_speed = 0;
  }
});
playButton.addEventListener("click", launchBall);
resetButton.addEventListener("click", resetBoard);


// Repaint Function
function rePaint() {
  ctx.clearRect(0, 0, game.width, game.height);
  playerHuman.render();
  playerComputer.render();
  ball.render();
  requestAnimationFrame(rePaint);
  detectWallCollisionHuman();
  detectWallCollisionComputer();
  detectPaddleHit();
  computerAI();
  detectBallBounce();
  checkForPoint();
  checkWin();
  ball.updateBall();
  playerHuman.update();
}
requestAnimationFrame(rePaint);

// Check if the player paddle hits the upper or lower walls of the canvas
function detectWallCollisionHuman() {
  if (playerHuman.y <= 0) {
    playerHuman.y = 0;
  } else if (playerHuman.y >= 500) {
    playerHuman.y = 500;
  }
}

// Check if the computer paddle hits the upper or lower walls of the canvas
function detectWallCollisionComputer() {
  if (playerComputer.y <= 0) {
    playerComputer.y = 0;
  } else if (playerComputer.y >= 500) {
    playerComputer.y = 500;
  }
}

let updateBall = function () {
  ball.updateBall();
};
let updateHuman = function () {
  playerHuman.update();
};

ball.updateBall = function () {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

playerHuman.update = function () {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

// Collision detection for computer paddle/ball
function detectPaddleHit() {
  let collisionPointBottomComputer = playerComputer.y + playerComputer.height;
  let collisionPointTopComputer = playerComputer.y;
  let ballPos = ball.y;
  if (
    ball.x >= playerComputer.x &&
    ballPos <= collisionPointBottomComputer &&
    ballPos >= collisionPointTopComputer
  ) {
    ball.x_speed = -ball.x_speed;
    ball.y_speed = ball.y_speed + playerComputer.y_speed / 2;
  }
  let collisionPointBottomPlayer = playerHuman.y + playerHuman.height;
  let collisionPointTopPlayer = playerHuman.y;
  if (
    ball.x <= playerHuman.x &&
    ballPos <= collisionPointBottomPlayer &&
    ballPos >= collisionPointTopPlayer
  ) {
    ball.x_speed = -ball.x_speed;
    ball.y_speed = ball.y_speed + playerHuman.y_speed / 2;
  }
}
// Computer AI!
function computerAI() {
  if (playerComputer.y > ball.y - playerComputer.height / 2) {
    if (ball.x > 0) playerComputer.y -= playerComputer.speed / 1.5;
    else playerComputer.y -= playerComputer.speed / 4;
  }
  if (playerComputer.y < ball.y - playerComputer.height / 2) {
    if (ball.x > 0) playerComputer.y += playerComputer.speed / 1.5;
    else playerComputer.y += playerComputer.speed / 4;
  }
}
// Check for point scored
function checkForPoint() {
  if (ball.x <= 0) {
    ball.y = 294;
    ball.x = 350;
    ball.y_speed = 0;
    ball.x_speed = 0;
    lastRoundWinner = "Computer";
    computerScore++;
    cNumber = computerScoreDisplay.innerHTML;
    cNumber++;
    computerScoreDisplay.innerHTML = cNumber;
    if (computerScore <= 3 && playerScore <= 3) {
      setTimeout(launchBall, 1500);
    } else {
      return;
    }
  }
  if (ball.x >= 696) {
    ball.y = 294;
    ball.x = 350;
    ball.y_speed = 0;
    ball.x_speed = 0;
    lastRoundWinner = "Player";
    playerScore++;
    pNumber = playerScoreDisplay.innerHTML;
    pNumber++;
    playerScoreDisplay.innerHTML = pNumber;
    if (computerScore <= 3 && playerScore <= 3) {
      setTimeout(launchBall, 1500);
    } else {
      return;
    }
  }
}
// Detect ball bounce on edges of play space
function detectBallBounce() {
  if (ball.y <= 0 || ball.y >= 588) {
    ball.y_speed = -ball.y_speed;
  }
}
// Handle pop-up for "how to play"
function howToPlay() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

//check for win condition
function checkWin() {
  if (computerScore === 4 || playerScore === 4) {
    gameStatus = false;
    ball.y = 294;
    ball.x = 350;
    statusDisplay.innerHTML =
      lastRoundWinner +
      " wins! Click play game at the bottom of the screen to start a new game.";
  }
  if (computerScore === 0 && playerScore === 0) {
    statusDisplay.innerHTML = "Click Play Game to start!";
  }
  if (gameStatus === true) {
    statusDisplay.innerHTML = "Have fun!";
  }
  return;
}

//Handle ball launch
function launchBall() {
  ball.y_speed = randomNumber(-3, 3);
  gameStatus = true;
  if (computerScore === 4 || playerScore === 4) {
    computerScore = 0;
    playerScore = 0;
    computerScoreDisplay.innerHTML = 0;
    playerScoreDisplay.innerHTML = 0;
    lastRoundWinner = "Computer";
  }
  if (lastRoundWinner === "Computer") {
    ball.x_speed = -6;
  } else {
    ball.x_speed = 6;
  }
}
// randomize ball launch
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// handle resetting the board
function resetBoard() {
  ball.y = 294;
  ball.x = 350;
  computerScore = 0;
  playerScore = 0;
  computerScoreDisplay.innerHTML = 0;
  playerScoreDisplay.innerHTML = 0;
  lastRoundWinner = "Computer";
  gameStatus = false;
  playerHuman.x = 15;
  playerHuman.y = 250;
  playerComputer.x = 675;
  playerComputer.y = 250;
  ball.y_speed = 0;
  ball.x_speed = 0;
}
