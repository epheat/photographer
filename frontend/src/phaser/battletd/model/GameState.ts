import {TowerId} from "@/phaser/battletd/model/Towers";

export class BattleTDGameState {
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
            gold: 100,
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
            phase: WavePhase.BuyPhase,
            waveNumber: 1,
            phaseTime: 10_000,
            phaseTimeRemainingMillis: 10_000,
        }
    }
}

export interface PlayerState {
    castle: {
        hp: number;
        maxHp: number;
    }
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
}

export enum WavePhase {
    BuyPhase = "BuyPhase",
    BattlePhase = "BattlePhase",
}
