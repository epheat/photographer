import { Tower } from "@/phaser/battletd/gameobjects/Tower";
import GameScene from "@/phaser/battletd/scenes/GameScene";
import {eventBus, events} from "@/phaser/battletd/events/EventBus";
import { TowerId } from "@/phaser/battletd/model/Towers";

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
    const highlight = this.scene.add.rectangle(0, 0, 18, 18, 0xff4444, 0.5);
    highlight.setVisible(false);
    return highlight;
  }

  createPlotImage(): Phaser.GameObjects.Image {
    return this.scene.add.image(0, 0, 'plot');
  }

  onClick() {
    const playerState = (this.scene as GameScene).gameSimulator.gameState.playerState;
    if (playerState.selectedCard == undefined) {
      return;
    }
    const towerId: TowerId = playerState.bench[playerState.selectedCard];
    console.log(towerId);
    this.highlight.setVisible(false);
    this.image.setVisible(false);

    const tower = new Tower(this.scene, this.x, this.y, { towerId: towerId });

    this.scene.add.existing(tower);
    (this.scene as GameScene).towers.add(tower);
    this.disableInteractive();

    eventBus.emit(events.placeTower, this);
  }

  setTexture(key: string) {
    this.image.setTexture(key)
  }

  setHighlightVisible(visible: boolean) {
    if (this.image.visible) {
      this.highlight.setVisible(visible);
    }
  }

  destroy(fromScene?: boolean) {
    this.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onClick);
    super.destroy(fromScene);
  }
}