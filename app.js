const game = document.querySelector("#game");
let gameStatus = false;
let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const playButton = document.getElementById('play-button');

// playButton.addEventListener('click', startGame);



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
    this.x_speed = -6;
    this.y_speed = -3;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let playerHuman = new Paddle(15, 250, "slategrey", 10, 100);
let playerComputer = new Paddle(675, 250, "slategrey", 10, 100);
let ball = new Ball(350, 294, "slategrey", 12, 12);
// playerHuman.render()
// playerComputer.render()
// ball.render()

// document.getElementById('play-button').addEventListener('click', function() {
//     playerComputer.render()
//     playerHuman.render()
//     ball.render()
// })

document.addEventListener("keydown", function (evt) {
  if (evt.key === "w") {
    playerHuman.y_speed =-5
  } else if (evt.key === "s") {
    playerHuman.y_speed = 5
  }
});
document.addEventListener("keyup", function (evt) {
  if (evt.key === "w") {
    playerHuman.y_speed = 0
  } else if (evt.key === "s") {
    playerHuman.y_speed = 0
  }
});

function rePaint() {
  ctx.clearRect(0, 0, game.width, game.height);
  playerHuman.render();
  playerComputer.render();
  ball.render();
  requestAnimationFrame(rePaint);
  detectWallCollisionHuman();
  detectWallCollisionComputer();
  detectPaddleHitPlayer();
  detectPaddleHitComputer();
  computerAI();
  detectBallBounce();
  checkForPointHuman();
  checkForPointComputer();
  checkWin();
  ball.updateBall()
  playerHuman.update()
  // playerComputer.updateComputer()
}
requestAnimationFrame(rePaint);

function detectWallCollisionHuman() {
  if (playerHuman.y <= 0) {
    playerHuman.y = 0;
  } else if (playerHuman.y >= 500) {
    playerHuman.y = 500;
  }
}

//try to consolidate these two functions

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

// let updateComputer = function () {
//   playerComputer.updateComputer()
// }
// playerComputer.updateComputer = function() {
//   this.x += this.x_speed;
//   this.y += this.y_speed;
// }

// function detectPaddleHitPlayer() {
//     if(ball.x <= playerHuman.x + playerHuman.width) {
//         ball.x_speed = -ball.x_speed
//     }
// }
function detectPaddleHitComputer() {
  let collisionPointBottom = playerComputer.y + playerComputer.height;
  let collisionPointTop = playerComputer.y;
  let ballPos = ball.y;
  if (
    ball.x >= playerComputer.x &&
    ballPos <= collisionPointBottom &&
    ballPos >= collisionPointTop
  ) {
    ball.x_speed = -ball.x_speed;
    // ball.y_speed = -ball.y_speed;
  }
}

function detectPaddleHitPlayer() {
  let collisionPointBottom = playerHuman.y + playerHuman.height;
  let collisionPointTop = playerHuman.y;
  let ballPos = ball.y;
  if (
    ball.x <= playerHuman.x &&
    ballPos <= collisionPointBottom &&
    ballPos >= collisionPointTop
  ) {
    ball.x_speed = -ball.x_speed -playerHuman.x_speed;
  }
}

// automation for computer paddle
// have computer paddle follow the y position of the ball

function computerAI() {








}

function checkForPointComputer() {
  if (ball.x <= 0) {
    computerScore++;
    ball.y = 294;
    ball.x = 350;
    cNumber = computerScoreDisplay.innerHTML
    cNumber++;
    computerScoreDisplay.innerHTML = cNumber;
  }
  console.log(computerScore)
  
}

function checkForPointHuman() {
  if (ball.x >= 696) {
    playerScore++;
    ball.y = 294;
    ball.x = 350;
    pNumber = playerScoreDisplay.innerHTML
    pNumber++;
    playerScoreDisplay.innerHTML = pNumber;
  }
}
function detectBallBounce() {
  if (ball.y <= 0 || ball.y >= 588) {
    ball.y_speed = -ball.y_speed;
  }
}


// increment score by one until a player reaches 4 points, then reset game,
// Add how to play and play buttons
// additional styling

function howToPlay() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

// function startGame() {
//   ball.y_speed = -3
//   ball.x_speed = -6
// }

function checkWin() {
  if (computerScore === 4 || playerScore === 4) {
    gameStatus = false;
    computerScore = 0;
    playerScore = 0;
    computerScoreDisplay.innerHTML = 0;
    playerScoreDisplay.innerHTML = 0;
  }
  return;
}

// function pauseGame() {
//   if (gameStatus = false) {


//   }
// }







