import * as Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'

function launch(containerId: string) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 100 }
      }
    },
    scene: [GameScene]
  }
  return new Phaser.Game(config);
}

export { launch }