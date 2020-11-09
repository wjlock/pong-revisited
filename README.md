# pong-revisited


## Steps to Install on local computer
1. Go to [repo](https://github.com/wjlock/pong-revisited) on Github profile
2. `fork` and `clone` repo
3. Clone to local machine
```text
git clone https://github.com/wjlock/pong-revisited.git
```
4. Go to `pong-revisted` directory
5. Open `index.html` in browser
```text
open index.html
```

```javascript
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
    ball.y_speed = ball.y_speed + playerComputer.y_speed / 2;
  }
}
```

```css

#how-to-play, #play-button, #reset-button, .popup {
    display: inline-flex;
    justify-content: center;
    padding: 10px;
    align-items: center;
    font-family: 'Indie Flower', cursive;
    font-size: x-large;
    font-weight: bold;
}
```

```html
<div class="popup" onclick="howToPlay()">How to Play
        <span class="popuptext" id="myPopup">The goal of the game is to score points by not allowing your opponent to return the ball. Line the paddle up with the ball to return a serve. The game is played as a best of 7, so first to accumulate 4 points wins!
            <br> <b>Click this popup to close the window.</b></br></span>
      </div>
```

| Functions | Description |
| ----------- | ----------- |
| `handlePlayerClick` | Handle every single click|
| `verifyGameStatus` | Check the status after each turn |

## Usage
