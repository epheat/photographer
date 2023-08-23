import { Tower } from "@/phaser/battletd/gameobjects/Tower";
import GameScene from "@/phaser/battletd/scenes/GameScene";

export class TowerPlot extends Phaser.GameObjects.Container {
  private readonly image: Phaser.GameObjects.Image;
  private readonly highlight: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.highlight = this.createHighlight();
    this.image = this.createPlotImage();
    this.add([this.highlight, this.image]);
    this.setSize(16, 16).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onClick);

    this.scene.add.existing(this);
  }

  createHighlight(): Phaser.GameObjects.Rectangle {
    return this.scene.add.rectangle(0, 0, 18, 18, 0x44ff44, 0.5);
  }

  createPlotImage(): Phaser.GameObjects.Image {
    return this.scene.add.image(0, 0, 'plot');
  }

  onClick() {
    this.highlight.setVisible(false);
    this.image.setVisible(false);

    const tower = new Tower(this.scene, this.x, this.y, {});

    this.scene.add.existing(tower);
    (this.scene as GameScene).towers.add(tower);
    this.disableInteractive();
  }

  setTexture(key: string) {
    this.image.setTexture(key)
  }

  showHighlight() {

  }

  destroy(fromScene?: boolean) {
    this.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onClick);
    super.destroy(fromScene);
  }
}