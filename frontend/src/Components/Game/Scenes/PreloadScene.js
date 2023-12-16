import Phaser from "phaser";

import menuBG from "../../../assets/menuBG.png"
import towerDefenseMap from "../../../assets/TowerDefenseMap.png"
import tutoPagePng from "../../../assets/tutoPage.png"

import goblinSprite from "../../../assets/spriteSheets/S_Goblin_walk.png"
import goblinDeathSprite from "../../../assets/spriteSheets/S_GoblinDeath.png"
import wolfSprite from "../../../assets/spriteSheets/S_Wolf.png"
import wolfDeathSprite from "../../../assets/spriteSheets/S_WolfDeath.png"
import hobGoblinSprite from "../../../assets/spriteSheets/S_HobGoblin.png"

import towerSprite from "../../../assets/spriteSheets/tower.png"
import crossbowSprite from "../../../assets/spriteSheets/crossbow.png"
import arrowPng from "../../../assets/arrow.png"
import crossbowArrowSprite from "../../../assets/spriteSheets/crossbowArrow.png"
import arrowImpactSprite from "../../../assets/spriteSheets/arrowImpact.png"
import AOETowerSprite from "../../../assets/spriteSheets/AOETower/AOETowerWeapon.png"
import AOETowerProjectileSprite from "../../../assets/spriteSheets/AOETower/AOETowerProjectile.png"
import AOETowerProjectileImpactSprite from "../../../assets/spriteSheets/AOETower/AOETowerProjectileImpact.png"

import pauseButtonSprite from "../../../assets/spriteSheets/UI/UIPauseButton.png"
import times2ButtonSprite from "../../../assets/spriteSheets/UI/UI2timeButton.png"
import musicToMuteButtonSprite from "../../../assets/spriteSheets/UI/UIMusicButtonToMutted.png"
import mutedMusicToMusicButton from "../../../assets/spriteSheets/UI/UIMutedMusicButtonToMusic.png"
import soundButtonSprite from "../../../assets/spriteSheets/UI/UISoundButton.png"
import tutoButtonSprite from "../../../assets/spriteSheets/UI/UITutoButton.png"
import campFireSprite from "../../../assets/spriteSheets/campFire.png"
import baseFlagSprite from "../../../assets/spriteSheets/baseFlag.png"
import starPng from "../../../assets/star.png"
import campPng from "../../../assets/camp.png"
import coinSprite from "../../../assets/spriteSheets/coin.png"
import heartSprite from "../../../assets/spriteSheets/heart.png"

import mainMenuMusic from "../../../assets/audio/mainMusic.mp3"
import backTrackSound from "../../../assets/audio/backTrackSound.mp3"
import arrowSound from "../../../assets/audio/arrowSound.mp3"
import bgmSound from "../../../assets/audio/Plain_Sight_Regular.mp3"
import buttonSFX from "../../../assets/audio/Minimalist10.mp3"

class PreloadScene extends Phaser.Scene {
    constructor(){
        super("Preload")
    }

    init() {
        this.readyCount = 0;
      }

    preload(){

        const sizeMap = {
            width : 1280,
            height:768
        }

        this.load.image("base", campPng);
        this.load.image("gameMenu",menuBG);
        this.load.image("gameMap", towerDefenseMap);
        this.load.image("arrow", arrowPng);
        this.load.image("star", starPng);
        this.load.image("tutoPage", tutoPagePng);

        this.load.spritesheet("goblin", goblinSprite,{
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("goblinDeath", goblinDeathSprite,{
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("wolf", wolfSprite,{
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("wolfDeath", wolfDeathSprite,{
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("hobGoblin", hobGoblinSprite,{
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("tower", towerSprite, {
            frameWidth: 70,
            frameHeight: 130
        });
        this.load.spritesheet("crossbow", crossbowSprite, {
            frameWidth: 96,
            frameHeight: 96
        }); 
        this.load.spritesheet("crossbowArrow", crossbowArrowSprite, {
            frameWidth: 8,
            frameHeight: 34
        }); 
        this.load.spritesheet("arrowImpact", arrowImpactSprite, {
            frameWidth: 64,
            frameHeight: 64
        }); 
        this.load.spritesheet("pauseButton", pauseButtonSprite, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("times2Button", times2ButtonSprite, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("musicToMuteButton", musicToMuteButtonSprite, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("mutedToMusicButton", mutedMusicToMusicButton, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("menuSoundButton",soundButtonSprite,{
            frameWidth:16,
            frameHeight:17
        })
        this.load.spritesheet("tutoButton", tutoButtonSprite, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("baseFlag", baseFlagSprite, {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.spritesheet("campFire", campFireSprite, {
            frameWidth: 32,
            frameHeight: 32
        })
        
        this.load.spritesheet("AOETower",AOETowerSprite,{
            frameWidth:96,
            frameHeight:96
        })
        this.load.spritesheet("AOETowerProjectile", AOETowerProjectileSprite, {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("AOETowerProjectileImpact", AOETowerProjectileImpactSprite, {
            frameWidth: 64,
            frameHeight: 64
        }); 
        this.load.spritesheet("coin", coinSprite, {
          frameWidth: 16,
          frameHeight: 16  
        })
        this.load.spritesheet("heart", heartSprite, {
            frameWidth: 16,
            frameHeight: 16  
          })

        this.load.audio("mainMenuMusic",[mainMenuMusic])
        this.load.audio("backTrackSound",[backTrackSound])
        this.load.audio("arrowSound",[arrowSound])
        this.load.audio("bgm", bgmSound)
        this.load.audio("buttonSFX", buttonSFX);
        this.createPreloader();
    }

    create(){
        // Sprite's animations
        this.anims.create({
            key: "goblin_anim",
            frames: this.anims.generateFrameNames("goblin"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "goblinDeath_anim",
            frames: this.anims.generateFrameNames("goblinDeath"),
            frameRate: 50,
            repeat: 0
        });

        this.anims.create({
            key: "wolf_anim",
            frames: this.anims.generateFrameNames("wolf"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "wolfDeath_anim",
            frames: this.anims.generateFrameNames("wolfDeath"),
            frameRate: 60,
            repeat: 0
        });
        this.anims.create({
            key: "hobGoblin_anim",
            frames: this.anims.generateFrameNames("hobGoblin"),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: "tower_anim",
            frames: this.anims.generateFrameNames("tower"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"AOETower_anim",
            frames: this.anims.generateFrameNames("AOETower"),
            frameRate:29,
            repeat:-1
        })

        this.anims.create({
            key: "crossbow_anim",
            frames: this.anims.generateFrameNames("crossbow"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "AOETowerWeapon_anim",
            frames : this.anims.generateFrameNames("AOETower"),
            framesRate:29,
            repeat:-1
        })

        this.anims.create({
            key: "crossbowArrow_anim",
            frames: this.anims.generateFrameNames("crossbowArrow"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'AOETowerProjectile_anim',
            frames: this.anims.generateFrameNames("AOETowerProjectile")
        })

        this.anims.create({
            key: "arrowImpact_anim",
            frames: this.anims.generateFrameNames("arrowImpact"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "AOETowerWeaponImpact_anim",
            frames: this.anims.generateFrameNames("AOETowerProjectileImpact"),
            frameRate: 25,
            repeat: -1
        });
        this.anims.create({
            key: "pauseButton_anim",
            frames: this.anims.generateFrameNames("pauseButton"),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: "times2Button_anim",
            frames: this.anims.generateFrameNames("times2Button"),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key:"soundButton_anim",
            frames: this.anims.generateFrameNames("menuSoundButton"),
            frameRate:15,
            repeat:0
        })
        this.anims.create({
            key:"musicToMute_anim",
            frames: this.anims.generateFrameNames("musicToMuteButton"),
            frameRate:15,
            repeat:0
        })
        this.anims.create({
            key:"muteToMusic_anim",
            frame: this.anims.generateFrameNames("muteToMusicButton"),
            frameRate:15,
            repeat:0
        })

        this.anims.create({
            key:"tutoButton_anim",
            frames: this.anims.generateFrameNames("tutoButton"),
            frameRate:15,
            repeat:0
        })

        this.anims.create({
            key: "campFire_anim",
            frames: this.anims.generateFrameNames("campFire"),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "baseFlag_anim",
            frames: this.anims.generateFrameNames("baseFlag"),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "coin_anim",
            frames: this.anims.generateFrameNames("coin"),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: "heart_anim",
            frames: this.anims.generateFrameNames("heart"),
            frameRate: 15,
            repeat: 0
        });
        
         // Create continue Button
    }

    createPreloader() {

        const {width} = this.cameras.main;
        const {height} = this.cameras.main;

        this.add.image(width / 2, height / 2 - 130, "logo").setScale(0.1);
    
        // display progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);
    
        // loading text
        const loadingText = this.make.text({
          x: width / 2,
          y: height / 2 - 50,
          text: "Loading...",
          style: {
            font: "20px monospace",
            fill: "#ffffff"
          }
        });
        loadingText.setOrigin(0.5, 0.5);
    
        // percent text
        const percentText = this.make.text({
          x: width / 2,
          y: height / 2 - 5,
          text: "0%",
          style: {
            font: "18px monospace",
            fill: "#ffffff"
          }
        });
        percentText.setOrigin(0.5, 0.5);
    
        // loading assets text
        const assetText = this.make.text({
          x: width / 2,
          y: height / 2 + 50,
          text: "",
          style: {
            font: "18px monospace",
            fill: "#ffffff"
          }
        });
        assetText.setOrigin(0.5, 0.5);
    
        // update progress bar
        this.load.on("progress", value => {
          percentText.setText(`${parseInt(value * 100, 10)}%`);
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });
    
        // update file progress text
        this.load.on("fileprogress", file => {
          assetText.setText(`Loading asset: ${file.key}`);
        });
    
        // remove progressbar when complete
        this.load.on("complete", file => {
          progressBox.destroy();
          progressBar.destroy();
          assetText.destroy();
          loadingText.destroy();
          percentText.destroy();
          this.ready();
        });
    }

    ready() {
        this.scene.start('title');
      }
    



}

export default PreloadScene;