import {TowerType} from "@/phaser/battletd/model/Tower";

export enum RarityType {
    Common = "common",
    Uncommon = "uncommon",
    Rare = "rare",
    Epic = "epic",
    Legendary = "legendary",
}

export interface TowerCard {
    readonly towerType: TowerType;
    readonly rarity: RarityType;
    readonly cost?: number;
}

export const CannonTowerCard: TowerCard = {
    towerType: TowerType.Cannon,
    rarity: RarityType.Uncommon,
    cost: 2,
}

export const CrossbowTowerCard: TowerCard = {
    towerType: TowerType.Crossbow,
    rarity: RarityType.Common,
    cost: 1,
}

export const LightningTowerCard: TowerCard = {
    towerType: TowerType.Lightning,
    rarity: RarityType.Epic,
    cost: 3,
}

export const FireTowerCard: TowerCard = {
    towerType: TowerType.Fire,
    rarity: RarityType.Rare,
    cost: 2,
}