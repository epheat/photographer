import Phaser from 'phaser';

export const events: any = {
  newWave: "new-wave",
  monsterReachedPathEnd: "monster-reached-path-end",
  playerStateUpdate: "player-state-update",

  selectCard: "select-card",
}
export const eventBus: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();