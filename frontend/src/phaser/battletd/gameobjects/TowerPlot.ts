import { Tower } from "@/phaser/battletd/gameobjects/Tower";

export class TowerPlot extends Phaser.GameObjects.Container {
  private readonly image: Phaser.GameObjects.Image;
  private readonly highlight: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.highlight = this.scene.add.rectangle(0, 0, 18, 18, 0x44ff44, 0.5);
    this.add(this.highlight);
    this.image = this.scene.add.image(0, y, 'plot');
    this.add(this.image);
    this.setSize(16, 16).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onClick);

    this.scene.add.existing(this);
  }

  onClick() {
    this.highlight.setVisible(false);
    this.image.setVisible(false);

    this.add(new Tower(this.scene, 0, 0, {
      reloadTime: 2000,
    }));
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