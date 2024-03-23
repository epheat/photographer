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
    readonly projectileType: ProjectileType,
    readonly projectileSize: number,
    readonly projectileSpeed: number,
    readonly projectileDamage: number,
    readonly fireRate: number,
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
    readonly projectile: TowerProjectile,
    // TODO: sprite, etc.
}

export interface TowerSpriteInfo extends SpriteInfo {
    readonly towerId: TowerId,
}

export const towerDefinitions: { [key in TowerId]: TowerDefinition } = {
    [TowerId.RustyCannon]: {
        towerId: TowerId.RustyCannon,
        projectile: {
            projectileType: ProjectileType.Cannonball,
            fireRate: 10,
            projectileSize: 3,
            projectileSpeed: 200,
            projectileDamage: 35,
        },
    },
    [TowerId.BlastMortar]: {
        towerId: TowerId.BlastMortar,
        projectile: {
            projectileType: ProjectileType.Cannonball,
            fireRate: 5,
            projectileSize: 4,
            projectileSpeed: 150,
            projectileDamage: 50,
        },
    },
    [TowerId.PelletGun]: {
        towerId: TowerId.PelletGun,
        projectile: {
            projectileType: ProjectileType.Pellet,
            fireRate: 50,
            projectileSize: 3,
            projectileSpeed: 380,
            projectileDamage: 6,
        },
    },
    [TowerId.Catapult]: {
        towerId: TowerId.Catapult,
        projectile: {
            projectileType: ProjectileType.Cannonball,
            fireRate: 4,
            projectileSize: 7,
            projectileSpeed: 100,
            projectileDamage: 70,
        },

    },
    [TowerId.CompoundBow]: {
        towerId: TowerId.CompoundBow,
        projectile: {
            projectileType: ProjectileType.Arrow,
            fireRate: 15,
            projectileSize: 3,
            projectileSpeed: 350,
            projectileDamage: 22,
        },

    },
    [TowerId.Flamethrower]: {
        towerId: TowerId.Flamethrower,
        projectile: {
            projectileType: ProjectileType.Arrow,
            fireRate: 10,
            projectileSize: 4,
            projectileSpeed: 150,
            projectileDamage: 30,
        },

    },
    [TowerId.ReactorCore]: {
        towerId: TowerId.ReactorCore,
        projectile: {
            projectileType: ProjectileType.Arrow,
            fireRate: 10,
            projectileSize: 4,
            projectileSpeed: 200,
            projectileDamage: 30,
        },

    },
    [TowerId.TeslaCoil]: {
        towerId: TowerId.TeslaCoil,
        projectile: {
            projectileType: ProjectileType.Arrow,
            fireRate: 10,
            projectileSize: 4,
            projectileSpeed: 200,
            projectileDamage: 30,
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
