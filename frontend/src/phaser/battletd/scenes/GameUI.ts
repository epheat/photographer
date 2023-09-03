import buttonFlatSmall from "@/phaser/battletd/assets/ui/Complete_GUI_Essential_Pack_Free_Version/01_Basic_Collection/01_Flat_Theme/UI_Flat_Button_Small.png";
import { Button } from "@/phaser/battletd/gameobjects/Button";

export default class GameUI extends Phaser.Scene {

  private shopButton!: Button;
  private shop!: Phaser.GameObjects.Container;

  constructor() {
    super('game-ui')
  }


  preload() {
    this.load.image('button_flat_small', buttonFlatSmall);
  }

  create() {
    this.shopButton = new Button(this, 40, 20, { texture: 'button_flat_small', text: "Shop", onClick: this.toggleShop.bind(this) });
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
}