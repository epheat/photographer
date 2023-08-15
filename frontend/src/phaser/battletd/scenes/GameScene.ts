import Phaser from 'phaser'

import woolly from "@/phaser/battletd/assets/tiles/miniworld/woolly.png";
import forestTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Forest Tilesett.png";
import waterTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Water Tileset.png";
import settlementTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Settlement.png";
import forestPropsTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Forest Props.png";
import map2 from "@/phaser/battletd/tiled/map1.json";
import ComponentSystem from "@/phaser/battletd/system/ComponentSystem";
import Image = Phaser.GameObjects.Image;
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import { KeyboardMovementComponent } from "@/phaser/battletd/components/KeyboardMovementComponent";
import { CardinalAnimationComponent } from "@/phaser/battletd/components/CardinalAnimationComponent";

export default class GameScene extends Phaser.Scene {

    private components!: ComponentSystem;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private star!: Image;

    constructor() {
        super('game-scene')
    }

    preload() {
        this.load.spritesheet('woolly_frames', woolly, { frameWidth: 16, frameHeight: 16 } );

        this.load.image('forest', forestTileset);
        this.load.image('water', waterTileset);
        this.load.image('settlement', settlementTileset);
        this.load.image('props', forestPropsTileset);
        this.load.tilemapTiledJSON('map', map2);

        this.components = new ComponentSystem();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy();
        });

        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    create() {
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
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