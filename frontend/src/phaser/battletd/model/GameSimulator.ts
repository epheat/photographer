import { MersenneTwister } from "@/utils/mersenne-twister";
import {GameState, WavePhase} from "@/phaser/battletd/model/GameState";
import {TowerId} from "@/phaser/battletd/model/Towers";
import {towerCards} from "@/phaser/battletd/model/Cards";

export class BattleTDGameSimulator {
    public static readonly BUY_PHASE_TIME_MILLIS: number = 10_000;
    public static readonly PRE_BATTLE_PHASE_TIME_MILLIS: number = 3_000;
    public static readonly BATTLE_PHASE_TIME_MILLIS: number = 100_000;

    private random: MersenneTwister;
    public gameState: GameState;

    constructor(gameState: GameState) {
        this.random = new MersenneTwister(gameState.seed);
        this.gameState = gameState;
    }

    public update(time: number, delta: number) {
        this.updateWaveState(delta);
    }

    private updateWaveState(delta: number) {
        this.gameState.waveState.phaseTimeRemainingMillis -= delta;
        if (this.gameState.waveState.phaseTimeRemainingMillis <= 0 || this.gameState.waveState.complete) {
            // time's up, move to the next phase
            const next: WavePhase = this.getNextWavePhase(this.gameState.waveState.phase);
            if (next == WavePhase.BuyPhase) {
                this.gameState.waveState.phaseTime = BattleTDGameSimulator.BUY_PHASE_TIME_MILLIS;
                this.gameState.waveState.phaseTimeRemainingMillis = this.gameState.waveState.phaseTime;
                this.gameState.waveState.complete = false;
                if (!this.gameState.shopState.lock) {
                    this.gameState.shopState.offerings = this.refreshShop();
                }
            }
            if (next == WavePhase.PreBattlePhase) {
                this.gameState.waveState.waveNumber++;
                this.gameState.waveState.phaseTime = BattleTDGameSimulator.PRE_BATTLE_PHASE_TIME_MILLIS;
                this.gameState.waveState.phaseTimeRemainingMillis = this.gameState.waveState.phaseTime;
                this.gameState.waveState.complete = false;
            }
            if (next == WavePhase.BattlePhase) {
                this.gameState.waveState.phaseTime = BattleTDGameSimulator.BATTLE_PHASE_TIME_MILLIS;
                this.gameState.waveState.phaseTimeRemainingMillis = this.gameState.waveState.phaseTime;
                this.gameState.waveState.complete = false;
            }
            this.gameState.waveState.phase = next;
        }
    }

    private getNextWavePhase(phase: WavePhase): WavePhase {
        if (phase == WavePhase.PreBattlePhase) {
            return WavePhase.BattlePhase;
        } else if (phase == WavePhase.BattlePhase) {
            return WavePhase.BuyPhase;
        } else if (phase == WavePhase.BuyPhase) {
            return WavePhase.PreBattlePhase;
        } else {
            throw new Error("Invalid phase");
        }
    }

    private refreshShop(): TowerId[] {
        const offerings = [];
        for (let i=0; i<4; i++) { // TODO: shop size based on player level
            offerings.push(towerCards[this.nextInt(towerCards.length)].towerId);
        }
        return offerings;
    }

    private nextInt(maxExclusive: number) {
        return Math.floor(this.random.random() * maxExclusive);
    }
}