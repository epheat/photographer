export enum DamageType {
    Piercing = "Piercing",
    Slashing = "Slashing",
    Bludgeoning = "Bludgeoning",
    Explosive = "Explosive",
    Flame = "Flame",
    Shock = "Shock",
    Earth = "Earth",
    Water = "Water",
    Ice = "Ice",
    Radiation = "Radiation",
    Plasma = "Plasma",
    Solar = "Solar",
    Void = "Void",
}

export const physicalDamageTypes: DamageType[] = [
    DamageType.Piercing,
    DamageType.Slashing,
    DamageType.Bludgeoning,
    DamageType.Explosive,
]

export const elementalDamageTypes: DamageType[] = [
    DamageType.Ice,
    DamageType.Flame,
    DamageType.Earth,
    DamageType.Shock,
    DamageType.Water,
]

export const specialDamageTypes: DamageType[] = [
    DamageType.Radiation,
    DamageType.Plasma,
    DamageType.Solar,
    DamageType.Void,
]
