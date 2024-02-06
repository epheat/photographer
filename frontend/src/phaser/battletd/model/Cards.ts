import {TowerId} from "@/phaser/battletd/model/Towers";

export enum RarityType {
    Common = "common",
    Uncommon = "uncommon",
    Rare = "rare",
    Epic = "epic",
    Legendary = "legendary",
}

export interface TowerCard {
    readonly towerId: TowerId;
    readonly rarity: RarityType;
    readonly cost: number;
}

export const rustyCannonTowerCard: TowerCard = {
    towerId: TowerId.RustyCannon,
    rarity: RarityType.Common,
    cost: 2,
}

export const blastMortarTowerCard: TowerCard = {
    towerId: TowerId.BlastMortar,
    rarity: RarityType.Common,
    cost: 3,
}

export const pelletGunTowerCard: TowerCard = {
    towerId: TowerId.PelletGun,
    rarity: RarityType.Common,
    cost: 2,
}

export const compoundBowTowerCard: TowerCard = {
    towerId: TowerId.CompoundBow,
    rarity: RarityType.Uncommon,
    cost: 2,
}

export const catapultTowerCard: TowerCard = {
    towerId: TowerId.Catapult,
    rarity: RarityType.Uncommon,
    cost: 2,
}

export const teslaCoilTowerCard: TowerCard = {
    towerId: TowerId.TeslaCoil,
    rarity: RarityType.Rare,
    cost: 3,
}

export const flamethrowerTowerCard: TowerCard = {
    towerId: TowerId.Flamethrower,
    rarity: RarityType.Rare,
    cost: 4,
}

export const reactorCoreTowerCard: TowerCard = {
    towerId: TowerId.ReactorCore,
    rarity: RarityType.Epic,
    cost: 5,
}


export const towerCards: TowerCard[] = [
    rustyCannonTowerCard,
    blastMortarTowerCard,
    pelletGunTowerCard,
    compoundBowTowerCard,
    catapultTowerCard,
    teslaCoilTowerCard,
    flamethrowerTowerCard,
    reactorCoreTowerCard,
]

export function getTowerCard(towerId: TowerId): TowerCard | undefined {
    return towerCards.find(card => card.towerId == towerId);
}