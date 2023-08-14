import Phaser from 'phaser'

import bomb from "@/phaser/battletd/assets/bomb.png";
import sky from "@/phaser/battletd/assets/sky.png";
import platform from "@/phaser/battletd/assets/platform.png";
import star from "@/phaser/battletd/assets/star.png";
import dude from "@/phaser/battletd/assets/dude.png";
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

        this.components = new ComponentSystem();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy();
        });
    }

    create() {
        const background = this.add.image(400, 300, 'sky');
        this.star = this.add.image(400, 300, 'star');
        this.components.addComponent(this.star, new ClickComponent());
        this.components.addComponent(background, new ClickComponent());
    }

    update(time: number, delta: number) {
        this.components.update(delta);

    }
}