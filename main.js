import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import { GameLoop } from './src/GameLoop';
import { Input, RIGHT, LEFT, UP, DOWN } from './src/Input';

import './style.css'
import { gridCells, isSpaceFree } from './src/helpers/grid'; 
import { moveTowards } from './src/helpers/moveTowards';
import { walls } from './src/levels/level1';
import { STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './src/objects/Player/playerAnimations';
import { Animations } from './src/Animations';
import { FrameIndexPattern } from './src/FrameIndexPattern';

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
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    standDown: new FrameIndexPattern(STAND_DOWN),
    standUp: new FrameIndexPattern(STAND_UP),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRight: new FrameIndexPattern(STAND_RIGHT),
  })  
})

const playerDestinationPosition = player.position.duplicate();
let playerFacing = DOWN;

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),

})

const input = new Input();

//updating entities in game
const update = (delta) => {

  const distance = moveTowards(player, playerDestinationPosition, 1);
  const hasArrived = distance <= 1; //smooths out movement
  
  // attempt to move again if the hero is at the destination
  if (hasArrived) {
    tryMove();
  }

  // work on player animations
  player.step(delta);
}

const tryMove = () => {

  if (!input.direction) {
    if (playerFacing === LEFT) { player.animations.play('standLeft') };
    if (playerFacing === RIGHT) { player.animations.play('standRight') };
    if (playerFacing === UP) { player.animations.play('standUp') };
    if (playerFacing === DOWN) { player.animations.play('standDown') };
    return;
  }

  let nextX = playerDestinationPosition.x;
  let nextY = playerDestinationPosition.y;
  const gridSize = 16;

  if (input.direction === LEFT) {
    nextX -= gridSize;
    player.animations.play('walkLeft');
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    player.animations.play('walkRight');
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    player.animations.play('walkUp');
  }
  if (input.direction === DOWN) {
    nextY += gridSize;
    player.animations.play('walkDown');
  }

  playerFacing = input.direction ?? playerFacing;;

  // Validating if next space is free
  if (isSpaceFree(walls, nextX, nextY)) {
    playerDestinationPosition.x = nextX;
    playerDestinationPosition.y = nextY;
  }

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