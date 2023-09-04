import Phaser from 'phaser';

export const events = {
  newWave: "new-wave"
}
export const eventBus = new Phaser.Events.EventEmitter();