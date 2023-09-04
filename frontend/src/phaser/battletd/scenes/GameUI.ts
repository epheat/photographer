import buttonFlatSmall from "@/phaser/battletd/assets/ui/Complete_GUI_Essential_Pack_Free_Version/01_Basic_Collection/01_Flat_Theme/UI_Flat_Button_Small.png";
import { UIButton } from "@/phaser/battletd/gameobjects/UIButton";
import { eventBus, events } from "@/phaser/battletd/events/EventBus";

export default class GameUI extends Phaser.Scene {

  private shopButton!: UIButton;
  private waveButton!: UIButton;
  private shop!: Phaser.GameObjects.Container;

  constructor() {
    super('game-ui')
  }


  preload() {
    this.load.image('button_flat_small', buttonFlatSmall);
  }

  create() {
    this.shopButton = new UIButton(this, 40, 20, {
      text: "Shop",
      width: 70,
      onClick: this.toggleShop.bind(this)
    });

    this.waveButton = new UIButton(this, 55, 60, {
      text: "New wave",
      width: 100,
      onClick: this.newWave.bind(this)
    })

    this.shop = this.createShop();

  }

  createShop(): Phaser.GameObjects.Container {
    const shop = this.add.container(100, 100).setVisible(false);
    const background = this.add.rectangle(220, 100, 500, 300, 0xdddddd, 0.8);
    shop.add(background);
    return shop;
  }

  toggleShop() {
    console.log("toggle");
    this.shop.setVisible(!this.shop.visible)
  }

  newWave() {
    eventBus.emit(events.newWave)
  }
}