import Phaser from "phaser";
import towerDefenseMap from "../../assets/TowerDefenseMap.png"
import enemy1Sprite from "../../assets/spriteSheets/S_Goblin_walk.png"
import towerSprite from "../../assets/spriteSheets/tower.png"
import starPng from "../../assets/star.png"
import arrowPng from "../../assets/arrow.png"


class StartScene extends Phaser.Scene {
    constructor() {
        super("bootgame")
    }

    preload(){
        this.load.image("gameMap", towerDefenseMap);
        this.load.image("arrow", arrowPng);
        this.load.spritesheet("goblin", enemy1Sprite,{
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("tower", towerSprite, {
            frameWidth: 70,
            frameHeight: 130
        });
        this.load.image("star", starPng);
    }

    create(){
        // Load map
        this.background = this.add.image(0,0, "gameMap");
        this.background.setOrigin(0,0);
        this.add.text(20,20, "Hello World");

        // Sprite's animations
        this.anims.create({
            key: "goblin_anim",
            frames: this.anims.generateFrameNames("goblin"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "tower_anim",
            frames: this.anims.generateFrameNames("tower"),
            frameRate: 10,
            repeat: -1
        });

        // Button to next Scene
        const button = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'COMMENCER',
            {
                fontFamily: 'Candara, Arial',
                fontSize: '48px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        button.setInteractive();
        button.on('pointerover', () => { button.setFontSize(60); });
        button.on('pointerout', () => { button.setFontSize(48); });
        button.on('pointerdown', () => {
            this.scene.start('playGame');
        });

    }
}


export default StartScene;
