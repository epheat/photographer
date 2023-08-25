export class Monster extends Phaser.GameObjects.PathFollower {
  public velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number) {
    super(scene, path, x, y, 'bomb');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
  }

  update(time: number, delta: number) {
    const newVelocity = this.pathDelta.clone().scale(1000 / delta);
    // average the new and previous velocity to make it smoother.
    this.velocity = this.velocity.add(newVelocity).scale(0.5);
  }
}