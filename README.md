# pong-revisited
 This is a remake of the iconic game "Pong". Pong was one of the first arcade video games ever made, and is credited with launching the video game industry as a whole. The premise is simple: you control a paddle, and another player (or in this case, a computer) controls the other. You volley the ball back and forth until a point is scored (by a ball passing behind a paddle). This will continue in a best of 7 format. While this game may seem simple, it can get very intense. Players can increase ball speed using 'spin' and use the walls to their advantage. Give it a try!

 # How to Play

Using the 'W' and 'S' keys, move your paddle up and down. The person who scores a point 'serves' the next round. Try to apply spin by hitting the ball with your paddle moving. This maniulates the speed of the ball and makes it harder for your opponent to return. The game is played in a best of 7 format, so first to 4 points wins.

Click the "Play" button to get started. If you need to reset the table, click the 'reset' button. The score totals are at the bottom of the page.


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

## Roadmap

Items to add in the future, in no particular order:

1.) Difficulty levels
2.) Rounds
3.) center Net


| Functions | Description |
| ----------- | ----------- |
| `handleWallCollisionHuman` | Handle paddle collision with upper and lower bounds|
| `detectPaddleHit` | Handle paddle/ball collision |
| `computerAI` | Handle movement of computer paddle|
| `checkForPoint` | On each game tick, checks if a point was scored |
| `checkForWin` | On each game tick, checks if there is a winner|
| `howToPlay` | Handles "how to play" popup |
| `launchBall` | launches the ball in a randow y direction based on last point scored|
| `resetBoard` | Function to put board back to inital state after button click |

