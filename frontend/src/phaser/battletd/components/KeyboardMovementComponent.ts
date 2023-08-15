import ComponentSystem, { IComponent } from "@/phaser/battletd/system/ComponentSystem";

export class KeyboardMovementComponent implements IComponent {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly speed: number;
  private sprite!: Phaser.Physics.Arcade.Sprite;

  constructor(cursors: Phaser.Types.Input.Keyboard.CursorKeys, speed: number = 100) {
    this.cursors = cursors;
    this.speed = speed;
  }

  init(gameObject: Phaser.GameObjects.GameObject, components: ComponentSystem): void {
    this.sprite = gameObject as Phaser.Physics.Arcade.Sprite;
  }

  update(dt: number) {
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(this.speed);
    } else {
      this.sprite.setVelocityX(0);
    }
    if (this.cursors.up.isDown) {
      this.sprite.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.sprite.setVelocityY(this.speed);
    } else {
      this.sprite.setVelocityY(0);
    }
  }
}