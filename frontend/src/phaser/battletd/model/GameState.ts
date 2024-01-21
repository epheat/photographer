import {TowerId} from "@/phaser/battletd/model/Towers";

export interface GameState {
    version: string,
    seed: number,
    playerState: PlayerState,
    mapState: MapState,
    shopState: ShopState,
    waveNumber: number,
    waveTimeRemaining: number,
    castleHp: number,
}

export interface PlayerState {
    gold: number,
    xp: number,
    bench: TowerId[],
}

export interface MapState {
    towers: {
        [plotId: number]: TowerId,
    }
}

export interface ShopState {
    offerings: TowerId[],
    frozen: boolean,
}
