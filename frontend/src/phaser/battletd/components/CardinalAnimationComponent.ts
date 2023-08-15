import ComponentSystem, { IComponent } from "@/phaser/battletd/system/ComponentSystem";

export interface AnimationConfig {
  readonly lAnim: string,
  readonly rAnim: string,
  readonly uAnim: string,
  readonly dAnim: string,
}

export class CardinalAnimationComponent implements IComponent {
  private sprite!: Phaser.Physics.Arcade.Sprite;
  private readonly animationConfig: AnimationConfig;

  constructor(animationConfig: AnimationConfig) {
    this.animationConfig = animationConfig;
  }

  init(gameObject: Phaser.GameObjects.GameObject, components: ComponentSystem): void {
    this.sprite = gameObject as Phaser.Physics.Arcade.Sprite;
  }

  update(dt: number): void {
    if (this.sprite.body!.velocity.x > 0) {
      this.sprite.play(this.animationConfig.rAnim);
    } else if (this.sprite.body!.velocity.x < 0) {
      this.sprite.play(this.animationConfig.lAnim);
    }

    if (this.sprite.body!.velocity.y > 0) {
      this.sprite.play(this.animationConfig.dAnim);
    } else if (this.sprite.body!.velocity.y < 0) {
      this.sprite.play(this.animationConfig.uAnim);
    }

    if (this.sprite.body!.velocity.x == 0 && this.sprite.body!.velocity.y == 0) {
      this.sprite.stop();
    }
  }

}
