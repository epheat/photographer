import Phaser from 'phaser'

import bomb from "@/phaser/battletd/assets/bomb.png";
import sky from "@/phaser/battletd/assets/sky.png";
import platform from "@/phaser/battletd/assets/platform.png";
import star from "@/phaser/battletd/assets/star.png";
import dude from "@/phaser/battletd/assets/dude.png";
import forestTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Forest Tilesett.png";
import waterTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Water Tileset.png";
import settlementTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Settlement.png";
import forestPropsTileset from "@/phaser/battletd/assets/tiles/Forest BETA V3/Forest Props.png";
import map2 from "@/phaser/battletd/tiled/map1.json";
import ComponentSystem from "@/phaser/battletd/system/ComponentSystem";
import ClickComponent from "@/phaser/battletd/components/ClickComponent";
import Image = Phaser.GameObjects.Image;

export default class GameScene extends Phaser.Scene {

    private components!: ComponentSystem;
    private star!: Image;

    constructor() {
        super('game-scene')
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('ground', platform);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 } );

        this.load.image('forest', forestTileset);
        this.load.image('water', waterTileset);
        this.load.image('settlement', settlementTileset);
        this.load.image('props', forestPropsTileset);
        this.load.tilemapTiledJSON('map', map2);

        this.components = new ComponentSystem();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy();
        });
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
    }

    update(time: number, delta: number) {
        this.components.update(delta);
    }
}