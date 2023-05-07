const CANVAS_BORDER = "black";
const CANVAS_BACKGROUND = "white";
const SNAKE_COLOR = "lightgreen";
const SNAKE_BODY = "green";

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

let dx = 10;
let dy = 0;

let foodX;
let foodY;

var gameCanvas = document.getElementById("gameCanvas");

var ctx = gameCanvas.getContext("2d");

document.addEventListener("keydown", changeDirection);
main();
createFood();

function main() {
  if (didGameEnd()) return;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    main();
  }, 100);
}

function clearCanvas() {
  //setting the color
  ctx.strokeStyle = CANVAS_BORDER;
  ctx.fillStyle = CANVAS_BACKGROUND;

  //drawing the game area
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  //add to the beggining of the array
  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y == foodY;
  if (didEatFood) {
    createFood();
  } else {
    snake.pop();
  }

  //remove the last element
}

function drawSnake() {
  //loop each object in snake array
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokestyle = SNAKE_BODY;

  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokestyle = "blue";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didCollide) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  // Generate a random number the food x-coordinate
  foodX = randomTen(0, gameCanvas.width - 10);
  // Generate a random number for the food y-coordinate
  foodY = randomTen(0, gameCanvas.height - 10);

  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function isOnSnake(part) {
    if (part.x == foodX && part.y == foodY) createFood();
  });
}
