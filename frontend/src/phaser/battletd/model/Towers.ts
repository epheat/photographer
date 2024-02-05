
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

export interface TowerProjectile {
    readonly projectileType: ProjectileType,
    readonly projectileSize: number,
    readonly projectileSpeed: number,
    readonly fireRate: number,
}

export interface TowerDefinition {
    readonly towerId: TowerId,
    readonly projectile: TowerProjectile,
    // TODO: sprite, etc.
}

export const rustyCannon: TowerDefinition = {
    towerId: TowerId.RustyCannon,
    projectile: {
        projectileType: ProjectileType.Cannonball,
        fireRate: 10,
        projectileSize: 3,
        projectileSpeed: 2,
    },
}

export const blastMortar: TowerDefinition = {
    towerId: TowerId.BlastMortar,
    projectile: {
        projectileType: ProjectileType.Cannonball,
        fireRate: 10,
        projectileSize: 4,
        projectileSpeed: 2,
    },
}

export const pelletGun: TowerDefinition = {
    towerId: TowerId.PelletGun,
    projectile: {
        projectileType: ProjectileType.Pellet,
        fireRate: 30,
        projectileSize: 1,
        projectileSpeed: 8,
    },
}

const towerDefinitions: TowerDefinition[] = [
    rustyCannon,
    blastMortar,
    pelletGun,
]

export function getTowerDefinition(towerId: TowerId): TowerDefinition | undefined {
    return towerDefinitions.find(definition => definition.towerId == towerId);
}