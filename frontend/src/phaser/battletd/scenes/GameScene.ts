import Phaser from 'phaser'

import woolly from "@/phaser/battletd/assets/tiles/miniworld/woolly.png";
import miniTerrainTileset from "@/phaser/battletd/assets/tiles/miniworld/terrain.png";
import miniBuildingsTileset from "@/phaser/battletd/assets/tiles/miniworld/buildings.png";
import miniNatureTileset from "@/phaser/battletd/assets/tiles/miniworld/nature.png";
import tower from "@/phaser/battletd/assets/tiles/miniworld/tower.png";
import plot from "@/phaser/battletd/assets/tiles/miniworld/plot.png";
import bomb from "@/phaser/battletd/assets/bomb.png";
import map2 from "@/phaser/battletd/tiled/map2.json";
import ComponentSystem from "@/phaser/battletd/system/ComponentSystem";
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import { TowerPlot } from "@/phaser/battletd/gameobjects/TowerPlot";
import { KeyboardMovementComponent } from "@/phaser/battletd/components/KeyboardMovementComponent";
import { CardinalAnimationComponent } from "@/phaser/battletd/components/CardinalAnimationComponent";
import { Monster } from "@/phaser/battletd/gameobjects/Monster";

export default class GameScene extends Phaser.Scene {

    private components!: ComponentSystem;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('game-scene')
    }

    preload() {
        this.load.spritesheet('woolly_frames', woolly, { frameWidth: 16, frameHeight: 16 } );

        this.load.image('bomb', bomb);
        this.load.image('plot', plot);
        this.load.image('tower', tower);
        this.load.image('terrain', miniTerrainTileset);
        this.load.image('nature', miniNatureTileset);
        this.load.image('buildings', miniBuildingsTileset);
        this.load.tilemapTiledJSON('map2', map2);

        this.components = new ComponentSystem();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy();
        });

        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    create() {
        this.createMap2();

        const woolly = this.physics.add.sprite(100, 100, 'woolly');
        this.createWoollyAnimations(woolly)
        this.components.addComponent(woolly, new KeyboardMovementComponent(this.cursors));
        this.components.addComponent(woolly, new CardinalAnimationComponent({
            lAnim: 'walk-left',
            rAnim: 'walk-right',
            uAnim: 'walk-up',
            dAnim: 'walk-down'
        }));

        woolly.play('walk-right');
    }

    update(time: number, delta: number) {
        this.components.update(delta);
    }

    private createMap1() {
        const map = this.make.tilemap({ key: 'map1', tileWidth: 16, tileHeight: 16 });
        const forestTileset = map.addTilesetImage('Forest Tileset', 'forest');
        const waterTileset = map.addTilesetImage('Water Tileset', 'water');
        const settlementTileset = map.addTilesetImage('Settlement', 'settlement');
        const forestPropsTileset = map.addTilesetImage('Forest Props', 'props');
        const baseLayer = map.createLayer(0, forestTileset!, 0, 0);
        const waterLayer = map.createLayer(1, waterTileset!, 0, 0);
        const grassLayer = map.createLayer(2, forestTileset!, 0, 0);
        const pathLayer = map.createLayer(3, settlementTileset!, 0, 0);
        const rocksLayer = map.createLayer(4, forestPropsTileset!, 0, 0);
        const castleLayer = map.createLayer(5, settlementTileset!, 0, 0);
    }

    private createMap2() {
        const map = this.make.tilemap({ key: 'map2', tileWidth: 16, tileHeight: 16 });
        const terrainTileset = map.addTilesetImage('terrain', 'terrain');
        const buildingsTileset = map.addTilesetImage('buildings', 'buildings');
        const natureTileset = map.addTilesetImage('nature', 'nature');
        const waterLayer = map.createLayer('Water', terrainTileset!, 0, 0);
        const sandLayer = map.createLayer('Sand', terrainTileset!, 0, 0);
        const grassLayer = map.createLayer('Grass', terrainTileset!, 0, 0);
        const propsLayer = map.createLayer('Props', natureTileset!, 0, 0);
        const castleLayer = map.createLayer('Castle', buildingsTileset!, 0, 0);
        const pathLayer = map.getObjectLayer('MonsterPath');
        const pathStart = map.findObject(pathLayer!, object => object.name == "PathStart");
        const pathEnd = map.findObject(pathLayer!, object => object.name == "PathEnd");
        const monsterPath = new Phaser.Curves.Path(pathStart!.x!, pathStart!.y!).lineTo(pathEnd!.x!, pathEnd!.y!);

        const monster = new Monster(this, monsterPath, pathStart!.x!, pathStart!.y!);
        monster.startFollow(10000);

        // https://newdocs.phaser.io/docs/3.60.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects
        const plots = map.createFromObjects('Towers', { classType: TowerPlot, key: 'plot' });
    }


    private createWoollyAnimations(woolly: SpriteWithDynamicBody) {
        woolly.anims.create({
            key: 'walk-right',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('woolly_frames', {start: 0, end: 3}),
            repeat: -1
        });
        woolly.anims.create({
            key: 'walk-left',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('woolly_frames', {start: 4, end: 7}),
            repeat: -1
        });
        woolly.anims.create({
            key: 'walk-down',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('woolly_frames', {start: 8, end: 11}),
            repeat: -1
        });
        woolly.anims.create({
            key: 'walk-up',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('woolly_frames', {start: 12, end: 15}),
            repeat: -1
        });
    }
}