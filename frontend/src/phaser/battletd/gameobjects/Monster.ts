import { eventBus, events } from "@/phaser/battletd/events/EventBus";

export interface MonsterProps {
  maxHp: number;
  hpBarBaseScale?: number;
  castleDmg?: number;
}

export class Monster extends Phaser.GameObjects.PathFollower {
  public velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  private readonly hpBar: Phaser.GameObjects.Rectangle;
  private readonly maxHp: number;
  private hp: number;
  private readonly hpBarBaseScale: number;
  public readonly castleDmg: number;

  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number, props: MonsterProps) {
    super(scene, path, x, y, 'orc');
    this.hpBarBaseScale = props.hpBarBaseScale ?? 1.2;
    this.hpBar = this.scene.add.rectangle(this.x, this.y + this.displayHeight, this.displayWidth * this.hpBarBaseScale, 5, 0xff3333);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.maxHp = props.maxHp;
    this.hp = props.maxHp;
    this.castleDmg = props.castleDmg ?? 1;
  }

  update(time: number, delta: number) {
    const newVelocity = this.pathDelta.clone().scale(1000 / delta);
    // average the new and previous velocity to make it smoother.
    this.velocity = this.velocity.add(newVelocity).scale(0.5);
    this.hpBar.setPosition(this.x, this.y + this.displayHeight);

    if (this.pathVector.equals(this.path.getEndPoint())) {
      eventBus.emit(events.monsterReachedPathEnd, this);
      this.destroy();
    }
  }

  public takeDamage(dmg: number) {
    this.hp -= dmg;
    const newScale = this.hpBarBaseScale * (this.hp / this.maxHp);
    this.hpBar.setScale(newScale, 1);
    if (this.hp <= 0) {
      this.destroy();
    }
  }

  public finishTween() {
    console.log("hello");
  }

  public destroy() {
    super.destroy();
    this.hpBar.destroy();
  }
}