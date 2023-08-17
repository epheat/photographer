import { Monster } from "@/phaser/battletd/gameobjects/Monster";

export interface TowerConfig {
  readonly reloadTime?: number,
}

export class Tower extends Phaser.GameObjects.Container {
  private readonly rangeIndicator: Phaser.GameObjects.Shape;
  private readonly towerSprite: Phaser.GameObjects.Sprite;
  private readonly reloadIndicator: Phaser.GameObjects.Shape;
  private readonly reloadTime: number;
  private reloading: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, config: TowerConfig) {
    super(scene, x, y);
    this.reloadTime = config.reloadTime ?? 2000;
    this.rangeIndicator = this.createRangeIndicator();
    this.towerSprite = this.createTowerSprite();
    this.reloadIndicator = this.createReloadIndicator();
    this.add([this.rangeIndicator, this.towerSprite, this.reloadIndicator]);

    this.setSize(16, 16).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.reload);
    this.scene.add.existing(this);
  }

  protected createRangeIndicator(): Phaser.GameObjects.Shape {
    const indicator = this.scene.add.circle(0, 0, 80, 0x000, 0.0);
    indicator.setStrokeStyle(1, 0xff2222, 0.4);
    return indicator;
  }

  protected createTowerSprite(): Phaser.GameObjects.Sprite {
    return this.scene.add.sprite(0, 0, 'tower');
  }

  protected createReloadIndicator(): Phaser.GameObjects.Shape {
    const indicator =  this.scene.add.rectangle(0, this.towerSprite.displayHeight, this.towerSprite.displayWidth, 5, 0xffffff);
    indicator.setVisible(false);
    return indicator;
  }

  protected reload() {
    if (this.reloading) {
      return;
    }
    this.reloading = true;
    this.reloadIndicator.setVisible(true);
    this.reloadIndicator.setScale(1);

    this.scene.tweens.add({
      targets: this.reloadIndicator,
      duration: this.reloadTime,
      scaleX: 0.0,
      onComplete: () => {
        this.reloadIndicator.setVisible(false);
        this.reloading = false;
      }
    });
  }

  protected fireAt(monster: Monster) {

  }

}