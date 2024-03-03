import Phaser from 'phaser'
import miniTerrainTileset from "@/phaser/battletd/assets/tiles/miniworld/terrain.png";
import miniBuildingsTileset from "@/phaser/battletd/assets/tiles/miniworld/buildings.png";
import miniNatureTileset from "@/phaser/battletd/assets/tiles/miniworld/nature.png";
import tower from "@/phaser/battletd/assets/tiles/miniworld/tower.png";
import plot from "@/phaser/battletd/assets/tiles/miniworld/plot.png";
import orc from "@/phaser/battletd/assets/tiles/miniworld/orc.png";
import bomb from "@/phaser/battletd/assets/bomb.png";
import bullet from "@/phaser/battletd/assets/bullet.png";
import range from "@/phaser/battletd/assets/range.png";
import star from "@/phaser/battletd/assets/star.png";
import map1 from "@/phaser/battletd/tiled/map1.json";
import map2 from "@/phaser/battletd/tiled/map2.json";
import map3 from "@/phaser/battletd/tiled/map3.json";
import ComponentSystem from "@/phaser/battletd/system/ComponentSystem";
import { TowerPlot } from "@/phaser/battletd/gameobjects/TowerPlot";
import { Monster } from "@/phaser/battletd/gameobjects/Monster";
import { eventBus, events } from "@/phaser/battletd/events/EventBus";
import { BattleTDGameState, WavePhase } from "@/phaser/battletd/model/GameState";
import { BattleTDGame } from "@/phaser/battletd/BattleTD";
import { getTowerCard, TowerCard } from "@/phaser/battletd/model/Cards";
import { EnemyType } from "@/phaser/battletd/model/Enemies";

export default class GameScene extends Phaser.Scene {

    private components!: ComponentSystem;
    public monsters!: Phaser.Physics.Arcade.Group;
    public monsterSprites!: Phaser.Physics.Arcade.Group;
    public towers!: Phaser.GameObjects.Group;
    public plots!: Phaser.GameObjects.Group;

    private monsterPath!: Phaser.Curves.Path;
    private monsterPathStart!: Phaser.Types.Tilemaps.TiledObject;

    public gameState!: BattleTDGameState;

    constructor() {
        super('game-scene')
    }

    preload() {
        this.load.image('bomb', bomb);
        this.load.spritesheet('bullet', bullet, { frameWidth: 16, frameHeight: 16 });
        this.load.image('star', star);
        this.load.image('plot', plot);
        this.load.image('tower', tower);
        this.load.image('orc', orc);
        this.load.image('range_indicator', range)
        this.load.image('terrain', miniTerrainTileset);
        this.load.image('nature', miniNatureTileset);
        this.load.image('buildings', miniBuildingsTileset);
        this.load.spritesheet('buildings_sprites', miniBuildingsTileset, { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('map1', map1);
        this.load.tilemapTiledJSON('map2', map2);
        this.load.tilemapTiledJSON('map3', map3);

        this.components = new ComponentSystem();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy();
        });
    }

    create() {
        this.monsters = this.physics.add.group({ runChildUpdate: true });
        this.towers = this.add.group({ runChildUpdate: true });
        this.plots = this.add.group({ runChildUpdate: false });
        this.createMap3();

        this.gameState = (this.game as BattleTDGame).gameState;

        eventBus.on(events.newWave, this.spawnWave, this);
        eventBus.on(events.monsterReachedPathEnd, this.takeCastleDamage, this);
        eventBus.on(events.selectCard, this.selectCard, this);
        eventBus.on(events.buyCard, this.buyCard, this);
        eventBus.on(events.placeTower, this.placeTower, this);
    }

    update(time: number, delta: number) {
        this.components.update(delta);

        this.gameState.update(time, delta);

        if (this.gameState.waveState.phase == WavePhase.PreBattlePhase && this.monsters.children.size == 0) {
            this.spawnWave(EnemyType.Orc1, this.gameState.waveState.waveNumber);
        }
        if (this.gameState.waveState.phase == WavePhase.BattlePhase && this.monsters.children.size == 0) {
            this.gameState.waveState.complete = true;
            // TODO: calculate interest
            this.gameState.playerState.gold++;
        }
    }

    private createMap3() {
        const map = this.make.tilemap({ key: 'map3', tileWidth: 16, tileHeight: 16 });
        const terrainTileset = map.addTilesetImage('terrain', 'terrain');
        const buildingsTileset = map.addTilesetImage('buildings', 'buildings');
        const natureTileset = map.addTilesetImage('nature', 'nature');
        const baseLayer = map.createLayer('Base', terrainTileset!, 0, 0);
        const coastLayer = map.createLayer('Coast', terrainTileset!, 0, 0);
        const grassLayer = map.createLayer('Grass', terrainTileset!, 0, 0);
        const mountainLayer = map.createLayer('Mountain', terrainTileset!, 0, 0);
        const mountainTopLayer = map.createLayer('MountainTop', terrainTileset!, 0, 0);
        const natureLayer = map.createLayer('Nature', natureTileset!, 0, 0);
        const pathLayer = map.createLayer('Path', terrainTileset!, 0, 0);
        const castleLayer = map.createLayer('Castle', buildingsTileset!, 0, 0);
        const monsterPathLayer = map.getObjectLayer('MonsterPath');
        this.monsterPathStart = monsterPathLayer?.objects[0]!;
        this.monsterPath = new Phaser.Curves.Path(this.monsterPathStart!.x, this.monsterPathStart!.y);
        for (let i = 1; i < monsterPathLayer?.objects.length!; i++) {
            this.monsterPath.lineTo(monsterPathLayer?.objects[i].x!, monsterPathLayer?.objects[i].y!);
        }

        // https://newdocs.phaser.io/docs/3.60.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects
        this.plots.addMultiple(map.createFromObjects('Towers', { classType: TowerPlot, key: 'plot' }));
    }

    private spawnWave(enemyType: EnemyType, waveSize: number) {
        for (let i=0; i<waveSize; i++) {
            const monster = new Monster(this, this.monsterPath, this.monsterPathStart!.x!, this.monsterPathStart!.y!, {
                enemyType: enemyType,
            });
            this.monsters.add(monster);
            setTimeout(() => {
                monster.startFollow();
            }, 1000 * i + BattleTDGameState.PRE_BATTLE_PHASE_TIME_MILLIS)
        }
    }

    private takeCastleDamage(monster: Monster): void {
        this.gameState.playerState.castle.hp -= monster.castleDmg;
    }

    private selectCard(selectedIndex: number): void {
        this.gameState.playerState.selectedCard = selectedIndex;
        this.plots.children.each(tower => {
            (tower as TowerPlot).setHighlightVisible(selectedIndex != undefined);
            return true;
        });
    }

    private buyCard(shopIndex: number): void {
        const card: TowerCard = getTowerCard(this.gameState.shopState.offerings[shopIndex])!;
        this.gameState.playerState.gold -= card.cost;
        this.gameState.shopState.offerings.splice(shopIndex, 1);
        this.gameState.playerState.bench.push(card.towerId);
    }

    private placeTower(plot: TowerPlot): void {
        if (this.gameState.playerState.selectedCard == undefined) {
            console.log("No tower selected.");
            return;
        }
        this.gameState.playerState.bench.splice(this.gameState.playerState.selectedCard, 1);
        this.gameState.playerState.selectedCard = undefined;

        this.plots.children.each(tower => {
            (tower as TowerPlot).setHighlightVisible(false);
            return true;
        });
    }
}