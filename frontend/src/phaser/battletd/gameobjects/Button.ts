export interface ButtonConfig {
  texture: string,
  text?: string,
  onClick?: Function,
}

export class Button extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, buttonConfig: ButtonConfig) {
    super(scene, x, y);
    const button = scene.add.nineslice(0, 0, buttonConfig.texture, 0, 64, 32, 8, 8, 8, 8)
    this.add(button);
    if (buttonConfig.text) {
      const text = scene.add.text(0, 0, buttonConfig.text, {
        color: "#222",
      }).setOrigin(0.5, 0.5)
      this.add(text);
    }
    this.scene.add.existing(this);
    button.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, buttonConfig.onClick ?? this.onClick);
  }

  onClick() {
    console.log(`clicked on button ${this.name}`);
  }
}