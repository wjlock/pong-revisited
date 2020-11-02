

const game = document.querySelector('#game');



// syncing canvas's internal height/width
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
game.height = height.replace('px', "");
game.width = width.replace('px', "");
const ctx = game.getContext('2d')


// //testing rect buildout - player paddle
// ctx.fillStyle = 'slategrey'
// ctx.lineWidth = 5;
// ctx.fillRect(25,350,10,100)

// //testing rect buildout - computer paddle
// ctx.fillStyle = 'slategrey'
// ctx.lineWidth = 5;
// ctx.fillRect(875,350,10,100)

// //testing rect buildout - ball
// ctx.fillStyle = 'slategrey'
// ctx.lineWidth = 5;
// ctx.fillRect(450,380,12,12)


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
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.x_speed = -3
        this.y_speed = 0
        this.raidus = 7
    }
    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raidus, 2 * Math.PI, false)
        ctx.fillStyle = this.color
        ctx.fill();
    }
}

let playerHuman = new Paddle(15, 350, 'slategrey',10 ,100)
let playerComputer = new  Paddle(875, 350, 'slategrey', 10, 100)
let ball = new Ball(450,390,'slategrey',12,12)
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
}
requestAnimationFrame(rePaint)


function detectWallCollisionHuman() {
    if(playerHuman.y <= 0) {
        playerHuman.y = 0
    } else if(playerHuman.y >= 700) {
        playerHuman.y = 700
    }


}
let update = function() {
    ball.update();
};

ball.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
};
