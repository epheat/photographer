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
    cost: 1,
}

export const blastMortarTowerCard: TowerCard = {
    towerId: TowerId.BlastMortar,
    rarity: RarityType.Common,
    cost: 2,
}

export const pelletGunTowerCard: TowerCard = {
    towerId: TowerId.PelletGun,
    rarity: RarityType.Common,
    cost: 1,
}


const towerCards: TowerCard[] = [
    rustyCannonTowerCard,
    blastMortarTowerCard,
    pelletGunTowerCard,
]

export function getTowerCard(towerId: TowerId): TowerCard | undefined {
    return towerCards.find(card => card.towerId == towerId);
}