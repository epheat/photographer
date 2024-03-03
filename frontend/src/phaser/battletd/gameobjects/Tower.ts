import { Monster } from "@/phaser/battletd/gameobjects/Monster";
import GameScene from "@/phaser/battletd/scenes/GameScene";
import { TowerId } from "@/phaser/battletd/model/Towers";
import { prop } from "vue-class-component";

export interface TowerOptions {
  readonly towerId: TowerId,
  readonly reloadTime?: number,
  readonly range?: number,
  readonly projectileSize?: number,
  readonly projectileSpeed?: number,
  readonly projectileDamage?: number,
}

export interface TowerProps extends TowerOptions {

}

export class Tower extends Phaser.GameObjects.Container {
  private readonly rangeIndicator: Phaser.GameObjects.Image;
  private readonly towerSprite: Phaser.GameObjects.Sprite;
  private readonly reloadIndicator: Phaser.GameObjects.Rectangle;
  private readonly towerId: TowerId;
  private readonly reloadTime: number;
  private readonly range: number;
  private readonly projectiles: Phaser.Physics.Arcade.Group;
  private readonly projectileSize: number;
  private readonly projectileSpeed: number;
  private readonly projectileDamage: number;
  private reloading: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, props: TowerProps) {
    super(scene, x, y);
    this.towerId = props.towerId;
    this.rangeIndicator = this.createRangeIndicator();
    this.towerSprite = this.createTowerSprite();
    this.reloadIndicator = this.createReloadIndicator();
    this.add([this.rangeIndicator, this.towerSprite, this.reloadIndicator]);
    this.reloadTime = props.reloadTime ?? 250;
    this.range = props.range ?? 120;
    this.projectileSize = props.projectileSize ?? 4;
    this.projectileSpeed = props.projectileSpeed ?? 250;
    this.projectileDamage = props.projectileDamage ?? 30;

    // this.setSize(16, 16).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.reload);
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
    const spriteInfo: SpriteInfo = this.getTowerSpriteInfo(this.towerId);
    return this.scene.add.sprite(0, 0, spriteInfo.texture, spriteInfo.frame);
  }

  protected createReloadIndicator(): Phaser.GameObjects.Rectangle {
    return this.scene.add.rectangle(0, this.towerSprite.displayHeight, this.towerSprite.displayWidth, 5, 0xffffff)
      .setVisible(false);
  }

  // should be called every frame. To do this, add towers to a group with runChildUpdate=true
  // https://newdocs.phaser.io/docs/3.60.0/Phaser.GameObjects.Group#runChildUpdate
  update() {
    const monsterToAttack = this.getFurthestInPath((this.scene as GameScene).monsters);
    if (monsterToAttack) {
      this.fireAt(monsterToAttack);
    }
  }

  protected getNearest(monsters: Phaser.GameObjects.Group): Monster | undefined {
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

  protected getFurthestInPath(monsters: Phaser.GameObjects.Group): Monster | undefined {
    const monsterUnits = monsters.getChildren() as Monster[];
    const monstersInRange = monsterUnits.filter(monster => Phaser.Math.Distance.Between(this.x, this.y, monster.x, monster.y) < this.range);
    if (monstersInRange.length == 0) {
      return;
    }
    return monstersInRange.reduce((curr, prev) => curr.pathProgress > prev.pathProgress ? curr : prev);
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
    const spriteInfo: SpriteInfo = this.getProjectileSpriteInfo(this.towerId);
    const projectile = this.scene.physics.add.image(this.x, this.y, spriteInfo.texture, spriteInfo.frame);
    projectile.setCircle(this.projectileSize);
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

  private getProjectileSpriteInfo(towerId: TowerId): SpriteInfo {
    switch(towerId) {
      case TowerId.RustyCannon:
        return { texture: 'bullet', frame: 0 };
      case TowerId.PelletGun:
        return { texture: 'bullet', frame: 2 };
      case TowerId.BlastMortar:
        return { texture: 'bullet', frame: 1 };
      case TowerId.Catapult:
        return { texture: 'bullet', frame: 1 };
      case TowerId.CompoundBow:
        return { texture: 'bullet', frame: 2 };
      case TowerId.Flamethrower:
        return { texture: 'bullet', frame: 3 };
      case TowerId.ReactorCore:
        return { texture: 'bullet', frame: 3 };
      case TowerId.TeslaCoil:
        return { texture: 'bullet', frame: 0 };
      default:
        return { texture: 'bullet', frame: 2 };
    }
  }

  private getTowerSpriteInfo(towerId: TowerId): SpriteInfo {
    switch(towerId) {
      case TowerId.RustyCannon:
        return { texture: 'buildings_sprites', frame: 526 };
      case TowerId.PelletGun:
        return { texture: 'buildings_sprites', frame: 6 };
      case TowerId.BlastMortar:
        return { texture: 'buildings_sprites', frame: 65 };
      case TowerId.Catapult:
        return { texture: 'buildings_sprites', frame: 1570 };
      case TowerId.CompoundBow:
        return { texture: 'buildings_sprites', frame: 1882 };
      case TowerId.Flamethrower:
        return { texture: 'buildings_sprites', frame: 614 };
      case TowerId.ReactorCore:
        return { texture: 'buildings_sprites', frame: 807 };
      case TowerId.TeslaCoil:
        return { texture: 'buildings_sprites', frame: 546 };
      default:
        return { texture: 'tower' };
    }
  }
}

interface SpriteInfo {
  texture: string,
  frame?: number,
}
