
export enum EnemyType {
    Orc = "Orc",
}

export interface EnemyDefinition {
    readonly enemyType: EnemyType,
    readonly baseHp: number,
}

export interface WaveDefinition {
    readonly troops: EnemyDefinition[];
}