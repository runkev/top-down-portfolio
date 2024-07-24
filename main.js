import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import { GameLoop } from './src/GameLoop';
import { Input, RIGHT, LEFT, UP, DOWN } from './src/Input';

import './style.css'
import { gridCells } from './src/helpers/grid'; 
import { moveTowards } from './src/helpers/moveTowards';

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
})

const player = new Sprite({
  resource: resources.images.player,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
})

const playerDestinationPosition = player.position.duplicate();

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),

})

const input = new Input();

//updating entities in game
const update = () => {

  const distance = moveTowards(player, playerDestinationPosition, 1);
  const hasArrived = distance <= 1; //smooths out movement
  
  // attempt to move again if the hero is at the destination
  if (hasArrived) {
    tryMove();
  }
}

const tryMove = () => {

  if (!input.direction) {
    return;
  }

  let nextX = playerDestinationPosition.x;
  let nextY = playerDestinationPosition.y;
  const gridSize = 16;

  if (input.direction === LEFT) {
    nextX -= gridSize;
    player.frame = 9;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    player.frame = 3;
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    player.frame = 6;
  }
  if (input.direction === DOWN) {
    nextY += gridSize;
    player.frame = 0;
  }

  // check if space is free

  playerDestinationPosition.x = nextX;
  playerDestinationPosition.y = nextY;
}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // center player in cell
  const playerOffset = new Vector2(-8, -21);
  const playerPosX = player.position.x + playerOffset.x;
  const playerPosY = player.position.y + playerOffset.y;

  shadow.drawImage(ctx, playerPosX, playerPosY);
  player.drawImage(ctx, playerPosX, playerPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();