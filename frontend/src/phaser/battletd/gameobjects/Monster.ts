import { eventBus, events } from "@/phaser/battletd/events/EventBus";
import { EnemyDefinition, EnemyType, getEnemyDefinition } from "@/phaser/battletd/model/Enemies";
import Vector2 = Phaser.Math.Vector2;

export interface MonsterProps {
  enemyType: EnemyType;
  hpBarBaseScale?: number;
}

export class Monster extends Phaser.GameObjects.Container {
  public velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  public readonly monster: Phaser.GameObjects.Sprite;
  private readonly hpBar: Phaser.GameObjects.Rectangle;
  private readonly maxHp: number;
  private hp: number;
  private readonly hpBarBaseScale: number;
  public readonly castleDmg: number;
  public readonly enemyType: EnemyType;
  private readonly path: Phaser.Curves.Path;
  public isFollowing: boolean;
  private readonly pathProgressSpeed: number; // amount to move on the path per tick, normalized between 0 and 1
  public pathProgress: number; // progress on the path normalized between 0 and 1

  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number, props: MonsterProps) {
    super(scene, x, y);
    this.path = path;
    this.monster = this.scene.add.sprite(0, 0, 'orc');
    this.setSize(this.monster.displayWidth, this.monster.displayHeight);
    this.hpBarBaseScale = props.hpBarBaseScale ?? 1.2;
    this.hpBar = this.scene.add.rectangle(0, this.monster.displayHeight, this.monster.displayWidth * this.hpBarBaseScale, 5, 0xff3333);
    this.add([this.monster, this.hpBar]);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).setCircle(this.monster.displayWidth / 2);

    this.enemyType = props.enemyType;
    const enemyDefinition: EnemyDefinition = getEnemyDefinition(this.enemyType)!;

    this.maxHp = enemyDefinition.baseHp;
    this.hp = enemyDefinition.baseHp;
    this.castleDmg = enemyDefinition.castleDamage ?? 1;

    this.pathProgressSpeed = enemyDefinition.baseSpeed / this.path.getLength();
    this.pathProgress = 0.0;
    this.isFollowing = false;
  }

  update(time: number, delta: number) {
    if (!this.isFollowing) {
      return;
    }

    this.pathProgress += this.pathProgressSpeed * delta / 1000;
    if (this.pathProgress >= 1) {
      eventBus.emit(events.monsterReachedPathEnd, this);
      this.destroy();
      return;
    }

    const currentPosition = new Vector2(this.x, this.y);
    const nextPosition = this.path.getPoint(this.pathProgress);
    this.setPosition(nextPosition.x, nextPosition.y);

    this.velocity = nextPosition.subtract(currentPosition).scale(1 / delta * 1000);
  }

  public startFollow(): void {
    this.isFollowing = true;
  }

  public takeDamage(dmg: number) {
    this.hp -= dmg;
    const newScale = this.hpBarBaseScale * (this.hp / this.maxHp);
    this.hpBar.setScale(newScale, 1);
    if (this.hp <= 0) {
      this.destroy();
    }
  }
}