import {SpriteInfo} from "@/phaser/battletd/model/Common";

/**
 * --- IDENTIFIERS ---
 */

export enum TowerId {
    RustyCannon = "Rusty Cannon",
    BlastMortar = "Blast Mortar",
    PelletGun = "Pellet Gun",
    CompoundBow = "Compound Bow",
    Catapult = "Catapult",
    TeslaCoil = "Tesla Coil",
    Flamethrower = "Flamethrower",
    ReactorCore = "Reactor Core",
}
export enum ProjectileType {
    Cannonball = "cannonball",
    Arrow = "arrow",
    Pellet = "pellet",
}

/**
 * --- PROJECTILES ---
 */

export interface TowerProjectile {
    readonly type: ProjectileType,
    readonly size: number,
    readonly speed: number,
    readonly impactDamage: number,
    readonly lifespan?: number,
    readonly drag?: number,
}

export const projectileSpriteInfos: { [key in ProjectileType]: SpriteInfo } = {
    [ProjectileType.Cannonball]: { texture: 'bomb' },
    [ProjectileType.Arrow]: { texture: 'bullet' },
    [ProjectileType.Pellet]: { texture: 'pellet' },
}

/**
 * --- TOWERS ---
 */

export interface TowerDefinition {
    readonly towerId: TowerId,
    readonly reloadTime: number,
    readonly range: number,
    readonly projectile: TowerProjectile,
    // TODO: sprite, etc.
}

export interface TowerSpriteInfo extends SpriteInfo {
    readonly towerId: TowerId,
}

export const towerDefinitions: { [key in TowerId]: TowerDefinition } = {
    [TowerId.RustyCannon]: {
        towerId: TowerId.RustyCannon,
        reloadTime: 750,
        range: 120,
        projectile: {
            type: ProjectileType.Cannonball,
            size: 3,
            speed: 200,
            impactDamage: 35,
        },
    },
    [TowerId.BlastMortar]: {
        towerId: TowerId.BlastMortar,
        reloadTime: 1200,
        range: 400,
        projectile: {
            type: ProjectileType.Cannonball,
            size: 4,
            speed: 150,
            impactDamage: 50,
        },
    },
    [TowerId.PelletGun]: {
        towerId: TowerId.PelletGun,
        reloadTime: 110,
        range: 150,
        projectile: {
            type: ProjectileType.Pellet,
            size: 3,
            speed: 380,
            impactDamage: 4,
        },
    },
    [TowerId.Catapult]: {
        towerId: TowerId.Catapult,
        reloadTime: 2000,
        range: 400,
        projectile: {
            type: ProjectileType.Cannonball,
            size: 7,
            speed: 100,
            impactDamage: 70,
        },

    },
    [TowerId.CompoundBow]: {
        towerId: TowerId.CompoundBow,
        reloadTime: 780,
        range: 260,
        projectile: {
            type: ProjectileType.Arrow,
            size: 3,
            speed: 410,
            impactDamage: 22,
        },

    },
    [TowerId.Flamethrower]: {
        towerId: TowerId.Flamethrower,
        reloadTime: 10,
        range: 100,
        projectile: {
            type: ProjectileType.Arrow,
            size: 6,
            speed: 100,
            impactDamage: 2,
            drag: 0.4,
        },

    },
    [TowerId.ReactorCore]: {
        towerId: TowerId.ReactorCore,
        reloadTime: 3000,
        range: 600,
        projectile: {
            type: ProjectileType.Arrow,
            size: 4,
            speed: 200,
            impactDamage: 30,
        },

    },
    [TowerId.TeslaCoil]: {
        towerId: TowerId.TeslaCoil,
        reloadTime: 2600,
        range: 150,
        projectile: {
            type: ProjectileType.Arrow,
            size: 4,
            speed: 200,
            impactDamage: 30,
        },
    },
}

export const towerSpriteInfos: { [key in TowerId]: SpriteInfo } = {
    [TowerId.RustyCannon]: { texture: 'buildings_sprites', frame: 526 },
    [TowerId.BlastMortar]: { texture: 'buildings_sprites', frame: 65 },
    [TowerId.PelletGun]: { texture: 'buildings_sprites', frame: 6 },
    [TowerId.Catapult]: { texture: 'buildings_sprites', frame: 1570 },
    [TowerId.CompoundBow]: { texture: 'buildings_sprites', frame: 1882 },
    [TowerId.Flamethrower]: { texture: 'buildings_sprites', frame: 614 },
    [TowerId.ReactorCore]: { texture: 'buildings_sprites', frame: 807 },
    [TowerId.TeslaCoil]: { texture: 'buildings_sprites', frame: 546 },
}
