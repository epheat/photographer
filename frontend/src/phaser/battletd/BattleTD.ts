import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

function launch(containerId: string) {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerId,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: [GameScene]
    }
    return new Phaser.Game(config);
}

export { launch }