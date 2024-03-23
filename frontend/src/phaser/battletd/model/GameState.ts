import { TowerId } from "@/phaser/battletd/model/Towers";

export class BattleTDGameState implements GameState {

    version: string;
    seed: number;
    playerState: PlayerState;
    mapState: MapState;
    shopState: ShopState;
    waveState: WaveState;

    constructor() {
        this.version = "1.0";
        this.seed = Date.now();
        this.playerState = {
            gold: 10,
            xp: 0,
            bench: [],
            selectedCard: undefined,
            castle: {
                hp: 20,
                maxHp: 20,
            },
        }
        this.mapState = {
            towers: {}
        };
        this.shopState = {
            offerings: [],
            lock: false,
        };
        this.waveState = {
            phase: WavePhase.BattlePhase,
            waveNumber: 0,
            phaseTime: 0,
            phaseTimeRemainingMillis: 0,
            complete: true,
        }
    }

    // TODO: static constructor from JSON save file
}

export interface GameState {
    version: string,
    seed: number,
    playerState: PlayerState,
    mapState: MapState,
    shopState: ShopState,
    waveState: WaveState,
}

export interface PlayerState {
    castle: {
        hp: number;
        maxHp: number;
    },
    gold: number,
    xp: number,
    bench: TowerId[],
    selectedCard: number | undefined,
}

export interface MapState {
    towers: {
        [plotId: number]: TowerId,
    }
}

export interface ShopState {
    offerings: TowerId[],
    lock: boolean,
}

export interface WaveState {
    phase: WavePhase,
    waveNumber: number,
    phaseTime: number,
    phaseTimeRemainingMillis: number,
    complete: boolean,
}

export enum WavePhase {
    BuyPhase = "BuyPhase",
    PreBattlePhase = "PreBattlePhase",
    BattlePhase = "BattlePhase",
}
