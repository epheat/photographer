

export interface MonsterProps {
  maxHp: number;
  hpBarBaseScale?: number;
}

export class Monster extends Phaser.GameObjects.PathFollower {
  public velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  private readonly hpBar: Phaser.GameObjects.Rectangle;
  private maxHp: number;
  private hp: number;
  private hpBarBaseScale: number;

  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number, props: MonsterProps) {
    super(scene, path, x, y, 'orc');
    this.hpBarBaseScale = props.hpBarBaseScale ?? 1.2;
    this.hpBar = this.scene.add.rectangle(this.x, this.y + this.displayHeight, this.displayWidth * this.hpBarBaseScale, 5, 0xff3333);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.maxHp = props.maxHp;
    this.hp = props.maxHp;
  }

  update(time: number, delta: number) {
    const newVelocity = this.pathDelta.clone().scale(1000 / delta);
    // average the new and previous velocity to make it smoother.
    this.velocity = this.velocity.add(newVelocity).scale(0.5);
    this.hpBar.setPosition(this.x, this.y + this.displayHeight);
  }

  public takeDamage(dmg: number) {
    this.hp -= dmg;
    const newScale = this.hpBarBaseScale * (this.hp / this.maxHp);
    this.hpBar.setScale(newScale, 1);
    if (this.hp <= 0) {
      this.destroy();
      this.hpBar.destroy();
    }
  }
}