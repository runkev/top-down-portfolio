import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import { GameLoop } from './src/GameLoop';
import './style.css'

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
})

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),

})

const playerPos = new Vector2(16 * 6, 16 * 5);

const update = () => {
  //updating entities in game
}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // center player in cell
  const playerOffset = new Vector2(-8, -21);
  const playerPosX = playerPos.x + playerOffset.x;
  const playerPosY = playerPos.y + playerOffset.y;

  shadow.drawImage(ctx, playerPosX, playerPosY);
  player.drawImage(ctx, playerPosX, playerPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();