import { Monster } from "@/phaser/battletd/gameobjects/Monster";
import { eventBus, events } from "@/phaser/battletd/events/EventBus";

export interface CastleHpProps {
  maxHp: number;
}


export class CastleHp {
  private readonly scene: Phaser.Scene;
  //private readonly background: Phaser.GameObjects.Rectangle;
  private readonly hpText: Phaser.GameObjects.Text;
  private readonly maxHp: number;
  private hp: number;

  constructor(scene: Phaser.Scene, x: number, y: number, props: CastleHpProps) {
    this.scene = scene;
    this.maxHp = props.maxHp;
    this.hp = props.maxHp;

    //this.background = this.scene.add.rectangle(x, y, 80, 30, 0x333333, 0.9);
    this.hpText = this.scene.add.text(x, y, this.getText(), {

    });

    eventBus.on(events.castleDmg, this.takeDamage, this);
  }

  public takeDamage(monster: Monster) {
    this.hp -= monster.castleDmg;
    this.hpText.text = this.getText();
  }

  private getText() {
    return `${this.hp} / ${this.maxHp}`;
  }
}