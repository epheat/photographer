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

export const Orc1Enemy : EnemyDefinition = {
    enemyType: EnemyType.Orc1,
    baseHp: 200,
    baseSpeed: 10,
    baseResistances: [],
    baseWeaknesses: [ DamageType.Piercing ],
    rank: EnemyRank.Soldier,
    castleDamage: 1,
}
export const Orc2Enemy : EnemyDefinition = {
    enemyType: EnemyType.Orc2,
    baseHp: 250,
    baseSpeed: 12,
    baseResistances: [ DamageType.Slashing ],
    baseWeaknesses: [ DamageType.Piercing ],
    rank: EnemyRank.Commander,
    castleDamage: 1,
}
export const Orc3Enemy : EnemyDefinition = {
    enemyType: EnemyType.Orc3,
    baseHp: 300,
    baseSpeed: 15,
    baseResistances: [ ...physicalDamageTypes ],
    baseWeaknesses: [ ...elementalDamageTypes ],
    rank: EnemyRank.Leader,
    castleDamage: 1,
}
export const Orc4Enemy : EnemyDefinition = {
    enemyType: EnemyType.Orc4,
    baseHp: 500,
    baseSpeed: 8,
    baseResistances: [ ...elementalDamageTypes ],
    baseWeaknesses: [ DamageType.Piercing ],
    rank: EnemyRank.Elite,
    castleDamage: 1,
}

export const Demon1Enemy : EnemyDefinition = {
    enemyType: EnemyType.Demon1,
    baseHp: 220,
    baseSpeed: 9,
    baseResistances: [ DamageType.Flame ],
    baseWeaknesses: [ DamageType.Ice, DamageType.Slashing ],
    rank: EnemyRank.Soldier,
    castleDamage: 1,
}
export const Demon2Enemy : EnemyDefinition = {
    enemyType: EnemyType.Demon2,
    baseHp: 240,
    baseSpeed: 12,
    baseResistances: [ DamageType.Flame, DamageType.Piercing ],
    baseWeaknesses: [ DamageType.Ice ],
    rank: EnemyRank.Commander,
    castleDamage: 1,
}

export const Demon3Enemy : EnemyDefinition = {
    enemyType: EnemyType.Demon3,
    baseHp: 400,
    baseSpeed: 15,
    baseResistances: [ DamageType.Flame, ...physicalDamageTypes ],
    baseWeaknesses: [ DamageType.Ice ],
    rank: EnemyRank.Leader,
    castleDamage: 1,
}

export const ElkEnemy : EnemyDefinition = {
    enemyType: EnemyType.Elk,
    baseHp: 800,
    baseSpeed: 5,
    baseResistances: [ ...physicalDamageTypes ],
    baseWeaknesses: [ ...elementalDamageTypes ],
    rank: EnemyRank.Leader,
    castleDamage: 2,
}

export const MinotaurEnemy : EnemyDefinition = {
    enemyType: EnemyType.Minotaur,
    baseHp: 600,
    baseSpeed: 8,
    baseResistances: [ ...physicalDamageTypes, ...elementalDamageTypes ],
    baseWeaknesses: [ ...specialDamageTypes ],
    rank: EnemyRank.Elite,
    castleDamage: 2,
}

export const SkeletonEnemy : EnemyDefinition = {
    enemyType: EnemyType.Skeleton,
    baseHp: 100,
    baseSpeed: 20,
    baseResistances: [ ],
    baseWeaknesses: [ ...physicalDamageTypes ],
    rank: EnemyRank.Soldier,
    castleDamage: 1,
}

export const WoollyEnemy : EnemyDefinition = {
    enemyType: EnemyType.Woolly,
    baseHp: 500,
    baseSpeed: 10,
    baseResistances: [ DamageType.Ice ],
    baseWeaknesses: [ ],
    rank: EnemyRank.Leader,
    castleDamage: 1,
}

export const YetiEnemy : EnemyDefinition = {
    enemyType: EnemyType.Yeti,
    baseHp: 600,
    baseSpeed: 8,
    baseResistances: [ DamageType.Ice, DamageType.Water ],
    baseWeaknesses: [ ],
    rank: EnemyRank.Elite,
    castleDamage: 2,
}

// TODO: dragons as BOSS type enemies

export const enemies: EnemyDefinition[] = [
    Orc1Enemy,
    Orc2Enemy,
    Orc3Enemy,
    Orc4Enemy,
    Demon1Enemy,
    Demon2Enemy,
    Demon3Enemy,
    ElkEnemy,
    MinotaurEnemy,
    WoollyEnemy,
    YetiEnemy,
]
