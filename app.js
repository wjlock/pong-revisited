

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


//constructor for paddles (player and AI)

class Paddle {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let playerHuman = new Paddle(15, 350, 'slategrey',10 ,100)
let playerComputer = new  Paddle(875, 350, 'slategrey', 10, 100)
playerHuman.render()
playerComputer.render()