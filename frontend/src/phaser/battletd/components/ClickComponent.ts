import ComponentSystem, { IComponent } from "@/phaser/battletd/system/ComponentSystem";

export default class ClickComponent implements IComponent {
  private gameObject!: Phaser.GameObjects.GameObject;

  init(gameObject: Phaser.GameObjects.GameObject, components: ComponentSystem): void {
    this.gameObject = gameObject;
  }

  start() {
    console.log("start");
    this.gameObject.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleClick, this);
  }

  destroy() {
    this.gameObject.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleClick, this);
  }

  private handleClick() {
    console.log(`clicked on ${this.gameObject.name}`);
  }
}