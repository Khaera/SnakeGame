const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const buttonLight = document.querySelector('.button_light');
const buttonDark = document.querySelector('.button_dark');
const buttonReset = document.querySelector('.button_reset');

const ground = new Image();
ground.src = './images/ground.png';

const foodImage = new Image();
foodImage.src = './images/food.png';

let box = 32;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y:  Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
  if(event.keyCode == 37 && dir != 'right')
    dir = 'left';
  else if (event.keyCode == 38 && dir != 'down')
    dir = 'up';
  else if (event.keyCode == 39 && dir != 'left')
    dir = 'right';
  else if (event.keyCode == 40 && dir != 'up')
    dir = 'down';
}

function eatTail(head, array) {
  for(let i = 0; i < array.length; i++) {
    if(head.x == array[i].x && head.y == array[i].y)
    clearInterval(game), alert('Вы съели сами себя, игра окончена. Набрано ' + score + ' очков.');
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImage, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'red';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y:  Math.floor((Math.random() * 15 + 3)) * box,
    };
  }  else {
      snake.pop();
    }

    if(snakeX < box || snakeX > box * 17
      || snakeY < 3 * box || snakeY > box * 17)
      clearInterval(game), alert('Вы вышли за границы поля, игра окончена. Набрано ' + score + ' очков.');

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
      x: snakeX,
      y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 200);

function changeBackgroundColorToWhite() {
  document.body.style.backgroundColor = 'white';
}

buttonLight.addEventListener('click', changeBackgroundColorToWhite);

function changeBackgroundColorToBlack() {
  document.body.style.backgroundColor = 'black';
}

buttonDark.addEventListener('click', changeBackgroundColorToBlack);

function resetTitle() {
  location = location
}

buttonReset.addEventListener('click', resetTitle);
