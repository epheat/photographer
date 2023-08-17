export class Button extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
    scene.add.existing(this);
    this.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onClick);
  }

  onClick() {
    console.log(`clicked plot ${this.name}`);
  }
}