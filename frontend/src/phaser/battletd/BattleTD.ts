import * as Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import {BattleTDGameState} from "@/phaser/battletd/model/GameState";
import {BattleTDGameSimulator} from "@/phaser/battletd/model/GameSimulator";

export function launch(containerId: string, gameState: BattleTDGameState): BattleTDGame {
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
        scene: [GameScene]
    }

    return new BattleTDGame(config, gameState);
}

export class BattleTDGame extends Phaser.Game {
    public gameSimulator: BattleTDGameSimulator;
    constructor(config: Phaser.Types.Core.GameConfig, gameState: BattleTDGameState) {
        super(config);
        this.gameSimulator = new BattleTDGameSimulator(gameState);
    }
}
