import Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import GameUI from './scenes/GameUI';

export function launch(containerId: string): Phaser.Game {
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 40*16,
        height: 30*16,
        parent: containerId,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
            }
        },
        scene: [GameScene, GameUI]
    }
    return new Phaser.Game(config);
}
