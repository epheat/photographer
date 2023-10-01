import Phaser from 'phaser';

export const events = {
  newWave: "new-wave",
  castleDmg: "castle-dmg",
}
export const eventBus = new Phaser.Events.EventEmitter();