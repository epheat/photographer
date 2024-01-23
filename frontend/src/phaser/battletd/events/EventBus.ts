import Phaser from 'phaser';

export const events: any = {
  newWave: "new-wave",
  monsterReachedPathEnd: "monster-reached-path-end",

  selectCard: "select-card",
  placeTower: "place-tower",
}
export const eventBus: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();