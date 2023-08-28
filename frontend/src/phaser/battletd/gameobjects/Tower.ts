import { Monster } from "@/phaser/battletd/gameobjects/Monster";
import GameScene from "@/phaser/battletd/scenes/GameScene";

export interface TowerOptions {
  readonly reloadTime?: number,
  readonly range?: number,
  readonly projectileSpeed?: number,
  readonly projectileDamage?: number,
}

export interface TowerProps extends TowerOptions {

}

export class Tower extends Phaser.GameObjects.Container {
  private readonly rangeIndicator: Phaser.GameObjects.Image;
  private readonly towerSprite: Phaser.GameObjects.Sprite;
  private readonly reloadIndicator: Phaser.GameObjects.Rectangle;
  private readonly reloadTime: number;
  private readonly range: number;
  private readonly projectiles: Phaser.Physics.Arcade.Group;
  private readonly projectileSpeed: number;
  private readonly projectileDamage: number;
  private reloading: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, props: TowerProps) {
    super(scene, x, y);
    this.rangeIndicator = this.createRangeIndicator();
    this.towerSprite = this.createTowerSprite();
    this.reloadIndicator = this.createReloadIndicator();
    this.add([this.rangeIndicator, this.towerSprite, this.reloadIndicator]);
    this.reloadTime = props.reloadTime ?? 400;
    this.range = props.range ?? 120;
    this.projectileSpeed = props.projectileSpeed ?? 200;
    this.projectileDamage = props.projectileDamage ?? 40;

    this.setSize(16, 16).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.reload);
    this.scene.add.existing(this);
    this.projectiles = this.scene.physics.add.group();
    this.scene.physics.add.overlap(this.projectiles, (this.scene as GameScene).monsters, this.hitMonster.bind(this));
  }

  protected createRangeIndicator(): Phaser.GameObjects.Image {
    const indicator = this.scene.add.image(0, 0, 'range_indicator');
    indicator.setVisible(false);
    return indicator;
  }

  protected createTowerSprite(): Phaser.GameObjects.Sprite {
    return this.scene.add.sprite(0, 0, 'tower');
  }

  protected createReloadIndicator(): Phaser.GameObjects.Rectangle {
    return this.scene.add.rectangle(0, this.towerSprite.displayHeight, this.towerSprite.displayWidth, 5, 0xffffff)
      .setVisible(false);
  }

  // should be called every frame. To do this, add towers to a group with runChildUpdate=true
  // https://newdocs.phaser.io/docs/3.60.0/Phaser.GameObjects.Group#runChildUpdate
  update() {
    const monsterToAttack = this.getAggro((this.scene as GameScene).monsters);
    if (monsterToAttack) {
      this.fireAt(monsterToAttack);
    }
  }

  protected getAggro(monsters: Phaser.GameObjects.Group): Monster | undefined {
    const monsterUnits = monsters.getChildren() as Monster[];
    const monsterDistances = monsterUnits
      .map(monster => { return { monster: monster, distance: Phaser.Math.Distance.Between(this.x, this.y, monster.x, monster.y) }})
      .filter(mon => mon.distance < this.range);
    if (monsterDistances.length == 0) {
      return;
    } else {
      return monsterDistances.reduce((curr, prev) => curr.distance > prev.distance ? curr : prev).monster;
    }
  }

  protected reload() {
    if (this.reloading) {
      return;
    }
    this.reloading = true;
    this.reloadIndicator.setVisible(true);
    this.reloadIndicator.setScale(1);

    this.scene.tweens.add({
      targets: this.reloadIndicator,
      duration: this.reloadTime,
      scaleX: 0.0,
      onComplete: () => {
        this.reloadIndicator.setVisible(false);
        this.reloading = false;
      }
    });
  }

  protected fireAt(monster: Monster) {
    if (this.reloading) {
      return;
    }

    const projectile = this.createProjectile();
    const angle = this.getLeadingAngleToFire(monster);
    this.scene.physics.velocityFromRotation(angle, this.projectileSpeed, projectile.body.velocity);
    this.reload();
  }

  protected createProjectile(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    const projectile = this.scene.physics.add.image( this.x, this.y, 'bomb');
    projectile.setCircle(7);
    this.projectiles.add(projectile);
    return projectile;
  }

  // inspiration from https://www.reddit.com/r/gamedev/comments/3hgxs7/projectile_interception_how_ai_lead_their_shots/cu7lg92/
  protected getLeadingAngleToFire(monster: Monster): number {
    // in case the tower can't actually hit the monster based on its current path/speed and the projectile speed, we'll
    // fire directly toward the monster's current location.
    const directAngle = this.getDirectFireVector(monster).angle();

    const deltaX = monster.x - this.x;
    const deltaY = monster.y - this.y;
    const a = monster.velocity.x + monster.velocity.x + monster.velocity.y * monster.velocity.y - this.projectileSpeed * this.projectileSpeed;
    const b = 2 * deltaX * monster.velocity.x + 2 * deltaY * monster.velocity.y;
    const c = deltaX * deltaX + deltaY * deltaY;

    const t_plus = (-b + Math.sqrt(b * b - 4*a*c)) / 2 / a;
    const t_minus = (-b - Math.sqrt(b * b - 4*a*c)) / 2 / a;

    if (t_plus > 0) {
      return new Phaser.Math.Vector2(monster.x, monster.y).add(monster.velocity.clone().scale(t_plus).subtract(new Phaser.Math.Vector2(this.x, this.y))).angle();
    } else if (t_minus > 0) {
      return new Phaser.Math.Vector2(monster.x, monster.y).add(monster.velocity.clone().scale(t_minus).subtract(new Phaser.Math.Vector2(this.x, this.y))).angle();
    } else {
      return directAngle;
    }
  }

  protected getDirectFireVector(monster: Monster): Phaser.Math.Vector2 {
    const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, monster.x, monster.y));
    return this.scene.physics.velocityFromAngle(angle, this.projectileSpeed);
  }

  protected hitMonster(projectile: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
                       monster: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    projectile.destroy();
    (monster as Monster).takeDamage(this.projectileDamage);
  }

}