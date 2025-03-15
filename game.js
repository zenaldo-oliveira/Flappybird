// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
let gameStarted = false;

// onload game
let onloadImg;

// bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let birdUpImg, birdDownImg, birdMidImg;
let bird = { x: birdX, y: birdY, width: birdWidth, height: birdHeight };

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg, bottomPipeImg;

// physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let score = 0;

// game over
let gameOverImg;

// score logic
let scoreImages = [];
for (let i = 0; i < 10; i++) {
  let img = new Image();
  img.src = `./assets/${i}.png`;
  scoreImages.push(img);
}

// audio
let hitSound = new Audio("./assets/audios/hit.wav");
let wingSound = new Audio("./assets/audios/wing.wav");
let pointSound = new Audio("./assets/audios/point.wav");

let pipeInterval; // Definição global da variável

window.onload = function () {
  board = document.getElementById("gameCanvas");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  onloadImg = new Image();
  onloadImg.src = "./assets/message.png";
  onloadImg.onload = () => {
    drawStartScreen();
  };

  birdUpImg = new Image();
  birdUpImg.src = "./assets/redbird-upflap.png";
  birdDownImg = new Image();
  birdDownImg.src = "./assets/redbird-downflap.png";
  birdMidImg = new Image();
  birdMidImg.src = "./assets/redbird-midflap.png";

  topPipeImg = new Image();
  topPipeImg.src = "./assets/toppipe.png";
  bottomPipeImg = new Image();
  bottomPipeImg.src = "./assets/bottompipe.png";

  gameOverImg = new Image();
  gameOverImg.src = "./assets/gameover.png";
};

window.addEventListener("keydown", (e) => {
  if (!gameStarted && (e.code === "Space" || e.code === "ArrowUp")) {
    gameStarted = true;
    startGame();
  }
});

function drawStartScreen() {
  context.clearRect(0, 0, board.width, board.height);
  let imgWidth = boardWidth * 0.7;
  let imgHeight = imgWidth * (onloadImg.height / onloadImg.width);
  context.drawImage(
    onloadImg,
    (boardWidth - imgWidth) / 2,
    boardHeight / 3,
    imgWidth,
    imgHeight
  );
}

function startGame() {
  gameOver = false;
  bird.y = birdY;
  velocityY = 0;
  score = 0;
  pipeArray = [];

  clearInterval(pipeInterval);
  pipeInterval = setInterval(placePipes, 2000);

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveBird);
}

function update() {
  if (gameOver) return;
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  let birdImgToUse =
    velocityY < 0 ? birdUpImg : velocityY > 0 ? birdDownImg : birdMidImg;
  context.drawImage(birdImgToUse, bird.x, bird.y, bird.width, bird.height);

  if (bird.y >= board.height - bird.height) {
    endGame();
  }

  pipeArray.forEach((pipe) => {
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
      pointSound.play();
    }

    if (detectCollision(bird, pipe)) {
      endGame();
    }
  });

  pipeArray = pipeArray.filter((pipe) => pipe.x >= -pipeWidth);
  drawScore(score);
}

function placePipes() {
  if (gameOver) return;
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  pipeArray.push({
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  });

  pipeArray.push({
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  });
}

function moveBird(e) {
  if (["Space", "ArrowUp", "KeyX"].includes(e.code)) {
    velocityY = -6;
    wingSound.play();
    if (gameOver) startGame();
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function drawScore(score) {
  let scoreStr = Math.floor(score).toString();
  let digitWidth = scoreImages[0].width;
  let totalWidth = digitWidth * scoreStr.length;
  let startX = (boardWidth - totalWidth) / 2;

  scoreStr.split("").forEach((digit, i) => {
    context.drawImage(
      scoreImages[digit],
      startX + i * digitWidth,
      140,
      digitWidth,
      scoreImages[0].height
    );
  });
}

function endGame() {
  gameOver = true;
  clearInterval(pipeInterval);
  hitSound.play();

  let imgWidth = boardWidth * 0.6;
  let imgHeight = imgWidth * (gameOverImg.height / gameOverImg.width);
  context.drawImage(
    gameOverImg,
    (boardWidth - imgWidth) / 2,
    boardHeight / 3,
    imgWidth,
    imgHeight
  );
}
