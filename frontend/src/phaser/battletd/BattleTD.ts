import Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import GameUI from './scenes/GameUI';

function launch(containerId: string) {
    const config = {
        type: Phaser.AUTO,
        width: 320,
        height: 480,
        parent: containerId,
        physics: {
            default: 'arcade',
        },
        scene: [GameScene, GameUI]
    }
    return new Phaser.Game(config);
}

export { launch }