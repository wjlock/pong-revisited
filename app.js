

const game = document.querySelector('#game');
let gameStatus = false;



// syncing canvas's internal height/width
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
game.height = height.replace('px', "");
game.width = width.replace('px', "");
const ctx = game.getContext('2d')

//constructor for paddles (player and AI)

class Paddle {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.x_speed = 0;
        this.y_speed = 0;
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

//constructor for ball

class Ball {
    constructor(x, y, color, height, width) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.x_speed = -6
        this.y_speed = 0
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

    }
}

let playerHuman = new Paddle(15, 300, 'slategrey',10 ,100)
let playerComputer = new  Paddle(685, 300, 'slategrey', 10, 100)
let ball = new Ball(350,300,'slategrey',12,12)
// playerHuman.render()
// playerComputer.render()
// ball.render()

document.getElementById('play-button').addEventListener('click', function() {
    playerComputer.render()
    playerHuman.render()
    ball.render()
})

document.addEventListener('keypress', function(evt) {
    if (evt.key === "w") {
        playerHuman.y -= 30
    } else if (evt.key === "s") {
        playerHuman.y += 30
    }


})

function rePaint() {
    ctx.clearRect(0,0,game.width,game.height);
    playerHuman.render();
    playerComputer.render();
    ball.render();
    requestAnimationFrame(rePaint)
    detectWallCollisionHuman()
    ball.update()
    detectPaddleHitPlayer()
    detectPaddleHitComputer()
    computerAI()
    console.log(ball.y)
}
requestAnimationFrame(rePaint)


function detectWallCollisionHuman() {
    if(playerHuman.y <= 0) {
        playerHuman.y = 0
    } else if(playerHuman.y >= 700) {
        playerHuman.y = 700
    }


}

function detectWallCollisionComputer() {
    if(playerComputer.y <= 0) {
        playerComputer.y = 0
    } else if(playerComputer.y >= 700) {
        playerComputer.y = 700
    }


}

let update = function() {
    ball.update();
};

ball.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
};

// function detectPaddleHitPlayer() {
//     if(ball.x <= playerHuman.x + playerHuman.width) {
//         ball.x_speed = -ball.x_speed
//     }
// }
function detectPaddleHitComputer() {
    let collisionPointBottom = playerComputer.y + playerComputer.height/2
    let collisionPointTop = playerComputer.y - playerComputer.height/2
    let ballPos = ball.y
    if(ball.x >= playerComputer.x
        && ballPos < collisionPointBottom
        && ballPos > collisionPointTop) {
        ball.x_speed = -ball.x_speed
    }
}


function detectPaddleHitPlayer() {
    let collisionPointBottom = playerHuman.y + playerHuman.height
    let collisionPointTop = playerHuman.y
    let ballPos = ball.y
    if(ball.x <= playerHuman.x
        && ballPos <= collisionPointBottom
        && ballPos >= collisionPointTop) {
        ball.x_speed = -ball.x_speed
    }
    console.log(collisionPointBottom)
}

// automation for computer paddle
// have computer paddle follow the y position of the ball

function computerAI() {
    playerComputer.y = ball.y - ball.height
    
}