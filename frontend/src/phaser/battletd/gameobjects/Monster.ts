export class Monster extends Phaser.GameObjects.PathFollower {
  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number) {
    super(scene, path, x, y, 'bomb');
    this.scene.add.existing(this);
  }
}