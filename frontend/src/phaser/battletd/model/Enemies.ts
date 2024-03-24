import {
    DamageType,
    elementalDamageTypes,
    physicalDamageTypes,
    specialDamageTypes
} from "@/phaser/battletd/model/Damage";

export enum EnemyType {
    Orc1 = "Orc1",
    Orc2 = "Orc2",
    Orc3 = "Orc3",
    Orc4 = "Orc4",
    Demon1 = "Demon1",
    Demon2 = "Demon2",
    Demon3 = "Demon3",
    Elk = "Elk",
    Minotaur = "Minotaur",
    Skeleton = "Skeleton",
    Woolly = "Woolly",
    Yeti = "Yeti",
}

export enum EnemyRank {
    Soldier = 0,
    Commander = 1,
    Leader = 2,
    Elite = 3,
    Boss = 4,
}

export interface EnemyDefinition {
    readonly enemyType: EnemyType,
    readonly baseHp: number,
    readonly baseSpeed: number,
    readonly baseResistances: DamageType[],
    readonly baseWeaknesses: DamageType[],
    readonly rank: EnemyRank,
    readonly castleDamage: number,
}

export interface EnemySquad {
    readonly enemyType: EnemyType,
    readonly troopCount: number,
    readonly bonusResistances: DamageType[],
}

export interface EnemyWave {
    readonly troops: EnemySquad[];
}

export const enemyDefinitions: { [key in EnemyType]: EnemyDefinition } = {
    [EnemyType.Orc1]: {
        enemyType: EnemyType.Orc1,
        baseHp: 200,
        baseSpeed: 50,
        baseResistances: [],
        baseWeaknesses: [ DamageType.Piercing ],
        rank: EnemyRank.Soldier,
        castleDamage: 1,
    },
    [EnemyType.Orc2]: {
        enemyType: EnemyType.Orc2,
        baseHp: 250,
        baseSpeed: 60,
        baseResistances: [ DamageType.Slashing ],
        baseWeaknesses: [ DamageType.Piercing ],
        rank: EnemyRank.Commander,
        castleDamage: 1,
    },
    [EnemyType.Orc3]: {
        enemyType: EnemyType.Orc3,
        baseHp: 300,
        baseSpeed: 75,
        baseResistances: [ ...physicalDamageTypes ],
        baseWeaknesses: [ ...elementalDamageTypes ],
        rank: EnemyRank.Leader,
        castleDamage: 1,
    },
    [EnemyType.Orc4]: {
        enemyType: EnemyType.Orc4,
        baseHp: 500,
        baseSpeed: 40,
        baseResistances: [ ...elementalDamageTypes ],
        baseWeaknesses: [ DamageType.Piercing ],
        rank: EnemyRank.Elite,
        castleDamage: 1,
    },
    [EnemyType.Demon1]: {
        enemyType: EnemyType.Demon1,
        baseHp: 220,
        baseSpeed: 45,
        baseResistances: [ DamageType.Flame ],
        baseWeaknesses: [ DamageType.Ice, DamageType.Slashing ],
        rank: EnemyRank.Soldier,
        castleDamage: 1,
    },
    [EnemyType.Demon2]: {
        enemyType: EnemyType.Demon2,
        baseHp: 240,
        baseSpeed: 60,
        baseResistances: [ DamageType.Flame, DamageType.Piercing ],
        baseWeaknesses: [ DamageType.Ice ],
        rank: EnemyRank.Commander,
        castleDamage: 1,
    },
    [EnemyType.Demon3]: {
        enemyType: EnemyType.Demon3,
        baseHp: 400,
        baseSpeed: 75,
        baseResistances: [ DamageType.Flame, ...physicalDamageTypes ],
        baseWeaknesses: [ DamageType.Ice ],
        rank: EnemyRank.Leader,
        castleDamage: 1,
    },
    [EnemyType.Elk]: {
        enemyType: EnemyType.Elk,
        baseHp: 800,
        baseSpeed: 25,
        baseResistances: [ ...physicalDamageTypes ],
        baseWeaknesses: [ ...elementalDamageTypes ],
        rank: EnemyRank.Leader,
        castleDamage: 2,
    },
    [EnemyType.Minotaur]: {
        enemyType: EnemyType.Minotaur,
        baseHp: 600,
        baseSpeed: 40,
        baseResistances: [ ...physicalDamageTypes, ...elementalDamageTypes ],
        baseWeaknesses: [ ...specialDamageTypes ],
        rank: EnemyRank.Elite,
        castleDamage: 2,
    },
    [EnemyType.Skeleton]: {
        enemyType: EnemyType.Skeleton,
        baseHp: 100,
        baseSpeed: 100,
        baseResistances: [ ],
        baseWeaknesses: [ ...physicalDamageTypes ],
        rank: EnemyRank.Soldier,
        castleDamage: 1,
    },
    [EnemyType.Woolly]: {
        enemyType: EnemyType.Woolly,
        baseHp: 500,
        baseSpeed: 50,
        baseResistances: [ DamageType.Ice ],
        baseWeaknesses: [ ],
        rank: EnemyRank.Leader,
        castleDamage: 1,
    },
    [EnemyType.Yeti]: {
        enemyType: EnemyType.Yeti,
        baseHp: 600,
        baseSpeed: 40,
        baseResistances: [ DamageType.Ice, DamageType.Water ],
        baseWeaknesses: [ ],
        rank: EnemyRank.Elite,
        castleDamage: 2,
    },
}

// TODO: dragons as BOSS type enemies
