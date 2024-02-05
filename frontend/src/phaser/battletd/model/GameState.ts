import {TowerId} from "@/phaser/battletd/model/Towers";
import { MersenneTwister } from "@/utils/mersenne-twister";

export class BattleTDGameState implements GameState {
    static readonly BUY_PHASE_TIME_MILLIS: number = 10_000;

    version: string;
    seed: number;
    playerState: PlayerState;
    mapState: MapState;
    shopState: ShopState;
    waveState: WaveState;

    private random: MersenneTwister;

    constructor() {
        this.version = "1.0";
        this.seed = Date.now();
        this.random = new MersenneTwister(this.seed);
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
            phase: WavePhase.BuyPhase,
            waveNumber: 1,
            phaseTime: 10_000,
            phaseTimeRemainingMillis: 10_000,
        }
    }

    public update(time: number, delta: number) {
        this.updateWaveState(delta);
    }

    private updateWaveState(delta: number) {
        this.waveState.phaseTimeRemainingMillis -= delta;
        if (this.waveState.phaseTimeRemainingMillis <= 0) {
            // time's up, move to the next phase
            const next: WavePhase = this.getNextWavePhase(this.waveState.phase);
            if (next == WavePhase.BuyPhase) {
                this.waveState.waveNumber++;
                this.waveState.phaseTime = BattleTDGameState.BUY_PHASE_TIME_MILLIS;
                this.waveState.phaseTimeRemainingMillis = this.waveState.phaseTime;
            }
            if (next == WavePhase.BattlePhase) {
                this.waveState.phaseTime = this.nextInt(10_000) + 10_000;
                this.waveState.phaseTimeRemainingMillis = this.waveState.phaseTime;
            }
            this.waveState.phase = next;
        }
    }

    private getNextWavePhase(phase: WavePhase): WavePhase {
        if (phase == WavePhase.BattlePhase) {
            return WavePhase.BuyPhase;
        } else if (phase == WavePhase.BuyPhase) {
            return WavePhase.BattlePhase;
        } else {
            throw new Error("Invalid phase");
        }
    }

    private nextInt(maxExclusive: number) {
        return Math.floor(this.random.random() * maxExclusive);
    }
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
}

export enum WavePhase {
    BuyPhase = "BuyPhase",
    BattlePhase = "BattlePhase",
}
