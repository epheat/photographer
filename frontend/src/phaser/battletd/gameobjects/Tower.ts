import { Monster } from "@/phaser/battletd/gameobjects/Monster";

export interface TowerOptions {
  readonly reloadTime?: number,
  readonly range?: number,
}

export interface TowerProps extends TowerOptions {
  // group of Monster GameObjects which the tower will use to track aggro
  readonly monsters: Phaser.GameObjects.Group,
}

export class Tower extends Phaser.GameObjects.Container {
  private readonly rangeIndicator: Phaser.GameObjects.Image;
  private readonly towerSprite: Phaser.GameObjects.Sprite;
  private readonly reloadIndicator: Phaser.GameObjects.Rectangle;
  private readonly reloadTime: number;
  private readonly range: number;
  private readonly monsters: Phaser.GameObjects.Group;
  private reloading: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, props: TowerProps) {
    super(scene, x, y);
    this.rangeIndicator = this.createRangeIndicator();
    this.towerSprite = this.createTowerSprite();
    this.reloadIndicator = this.createReloadIndicator();
    this.add([this.rangeIndicator, this.towerSprite, this.reloadIndicator]);
    this.reloadTime = props.reloadTime ?? 2000;
    this.range = props.range ?? 100;
    this.monsters = props.monsters;

    this.setSize(16, 16).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.reload);
    this.scene.add.existing(this);
  }

  protected createRangeIndicator(): Phaser.GameObjects.Image {
    return this.scene.add.image(0, 0, 'range_indicator');
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
    const monsterToAttack = this.getAggro(this.monsters);
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

  protected fireAt(monster: Phaser.GameObjects.GameObject) {
    console.log("firing at " + monster.name);
  }

}