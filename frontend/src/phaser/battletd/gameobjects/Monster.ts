import { prop } from "vue-class-component";

export interface MonsterProps {
  maxHp: number;
}

export class Monster extends Phaser.GameObjects.PathFollower {
  public velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  private maxHp: number;
  private hp: number;

  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number, props: MonsterProps) {
    super(scene, path, x, y, 'orc');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.maxHp = props.maxHp;
    this.hp = props.maxHp;
  }

  update(time: number, delta: number) {
    const newVelocity = this.pathDelta.clone().scale(1000 / delta);
    // average the new and previous velocity to make it smoother.
    this.velocity = this.velocity.add(newVelocity).scale(0.5);
  }

  public takeDamage(dmg: number) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.destroy();
    }
  }
}