import Phaser from 'phaser'

import bomb from "@/phaser/battletd/assets/bomb.png";
import sky from "@/phaser/battletd/assets/sky.png";
import platform from "@/phaser/battletd/assets/platform.png";
import star from "@/phaser/battletd/assets/star.png";
import dude from "@/phaser/battletd/assets/dude.png";

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('game-scene')
    }

    preload()
    {
        this.load.image('sky', sky)
        this.load.image('ground', platform)
        this.load.image('star', star)
        this.load.image('bomb', bomb)

        this.load.spritesheet('dude',
            dude,
            { frameWidth: 32, frameHeight: 48 }
        )
    }

    create()
    {
        this.add.image(400, 300, 'sky')
        this.add.image(400, 300, 'star')
    }
}