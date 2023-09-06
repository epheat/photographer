export interface ButtonConfig {
  texture?: string,
  width?: number,
  text?: string,
  onClick?: Function,
}

export class UIButton extends Phaser.GameObjects.Container {
  private onClick?: Function;
  private pressed: boolean = false;
  private sprite: Phaser.GameObjects.NineSlice;

  constructor(scene: Phaser.Scene, x: number, y: number, buttonConfig: ButtonConfig) {
    super(scene, x, y);
    this.sprite = scene.add.nineslice(0, 0, buttonConfig.texture ?? 'button_small', 'BTD_button_small.png', buttonConfig.width ?? 64, 32, 8, 8, 8, 8)
    this.add(this.sprite);
    this.onClick = buttonConfig.onClick;
    if (buttonConfig.text) {
      const text = scene.add.text(0, 0, buttonConfig.text, {
        color: "#222",
        fontFamily: "sans-serif"
      }).setOrigin(0.5, 0.5);
      this.add(text);
    }
    this.scene.add.existing(this);
    this.sprite.setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onUp.bind(this))
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onDown.bind(this))
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.onOver.bind(this))
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.onOut.bind(this))
  }

  clearAlpha(): this {
    return super.clearAlpha();
  }

  onUp() {
    this.pressed = false;
    this.sprite.setFrame('BTD_button_small.png');
    this.onClick?.();
  }

  onDown() {
    this.pressed = true;
    this.sprite.setFrame( 'BTD_button_small_press.png');
  }

  onOver() {
    if (this.pressed) {
      this.sprite.setFrame( 'BTD_button_small_press.png');
    }
  }

  onOut() {
    this.sprite.setFrame( 'BTD_button_small.png');
  }
}