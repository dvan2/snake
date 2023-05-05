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

var gameCanvas = document.getElementById("gameCanvas");

var ctx = gameCanvas.getContext("2d");

document.addEventListener("keydown", changeDirection);
main();

function main() {
  setTimeout(function onTick() {
    claerCanvas();
    advanceSnake();
    drawSnake();

    main();
  }, 100);
}

function claerCanvas() {
  //setting the color
  ctx.strokeStyle = CANVAS_BORDER;
  ctx.fillStyle = CANVAS_BACKGROUND;

  //drawing the game area
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
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

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  //add to the beggining of the array
  snake.unshift(head);

  //remove the last element
  snake.pop();
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
