import Phaser, { GameObjects } from "phaser";
import Goblin from "../Enemies/Goblin";
import Wolf from "../Enemies/Wolf";
import HobGoblin from "../Enemies/HobGoblin";
import Projectile from "../Projectile";
import AOEProjectile from "../AOEProjectile";
import Tower from "../Towers/Tower";
import AOETower from "../Towers/AOETower";
import { getAuthenticatedUser, isAuthenticated  } from "../../../utils/auths";

const placementTilesData = [0, 0, 0, 342, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 342, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 342, 0, 0, 0, 0, 342, 0, 0, 0, 0, 0, 0, 0, 342, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 342,
    0, 0, 0, 0, 342, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 342, 0, 0, 0, 342, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 342, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 342,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


class GameScene extends Phaser.Scene {
    constructor(){
        super("playGame");
        
    }
    
    create(){
        this.wave = 0;
        this.waveText = null;
        this.currency = 10000;
        this.score = 0;
        this.background = this.add.image(0,0, "gameMap");
        this.background.setOrigin(0,0);
        this.map = placementTilesData;
        this.props();
        this.playerLives = 10;
        this.nextWaveTime = 0;
        this.gameSpeed = 1;
        this.uiContainer = this.add.container(this.game.config.width / 2, 20);
        this.sellMode = false;


        this.buttonSFX = this.sound.add("buttonSFX",{
            loop: false,
            volume: 0.2
        })

        // Creating backTrackSound
        this.backTrackSound = this.sound.add("bgm",{
            loop:true,
            volume:0.05
        })
        this.backTrackSound.play()

        this.heart = this.add.sprite(400,820,"heart").setScale(4);
        this.playerLivesText = this.add.text(-200,788, `: ${this.playerLives} / 10`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        this.waveText = this.add.text(-50, 788, `Wave: ${this.wave}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        });

        this.gold = this.add.sprite(80,820,"coin").setScale(2);
        this.currencyText = this.add.text(-530, 788, `: ${this.currency}`,{
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        });

        this.scoreText = this.add.text(0, 0, `Score:`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        });

        this.shop = this.add.text(150 ,788,"SHOP",{
            fontFamily: 'Arial',
            fontSize:'24px',
            color: '#ffffff',
            fontStyle:'bold'
        })

        this.shopMode = this.add.text(1100, 810 ,"SELL Mode",{
            fontSize:'24px',
            fontStyle:'bold'
        }).setInteractive().on('pointerup',()=>{
            this.sellMode = !this.sellMode
        }).on('pointerover',()=>{
            this.shopMode.setFontStyle('')
        }).on('pointerout',()=>{
            this.shopMode.setFontStyle('bold')
        })
        
        
        this.uiContainer.add(this.playerLivesText);
        this.uiContainer.add(this.waveText);
        this.uiContainer.add(this.currencyText);
        this.uiContainer.add(this.shop)
        this.add.existing(this.uiContainer);
        
        
        this.shopCrossBow = this.add.image(900,810,"crossbow").setTint(0x666666)
        this.crossBowPrice = this.add.text(883,840,'125')
        this.shopAOETower = this.add.image(1000,810,"AOETower").setTint(0x666666)
        this.slowingTowerPrice = this.add.text(985,840,'250')

        


        // Path number 1 white

        const path1 = new Phaser.Curves.Path(147.166666666667,750)
        path1.lineTo(161.833333333333, 542.666666666667);
        path1.lineTo(545.166666666667, 545.333333333333);
        path1.lineTo(560,94.6666666666667);
        path1.lineTo(1120.83333333333,93.3333333333333);
        path1.lineTo(1119.16666666667,678.666666666667);
        path1.lineTo(739.166666666667,676);
        this.path1 = path1;

        const graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1);
    //    path1.draw(graphics);

        // Path number 2 green

        const path2 = new Phaser.Curves.Path(-96, 166.667);
        path2.lineTo(544, 166.667);
        path2.lineTo(548, 422.667);
        path2.lineTo(1118.67, 418.667);
        path2.lineTo(1117.33, 681.333);
        path2.lineTo(742.667, 678.667);
        this.path2 = path2;

        const graphics2 = this.add.graphics();
        graphics2.lineStyle(2, 0x00ff00, 1);
    //    path2.draw(graphics2);

        const path3 = new Phaser.Curves.Path(1370.67, 102.667);
        path3.lineTo(544,94.6667);
        path3.lineTo(549.333,424);
        path3.lineTo(1121.33,421.333);
        path3.lineTo(1118.67,680);
        path3.lineTo(737.333,676);
        this.path3 = path3;

        const graphics3 = this.add.graphics();
        graphics3.lineStyle(3, 0xffffff, 1);
    //    path3.draw(graphics3);

        this.createGroup();
        
        this.totalEnemies = 5;
        this.nextEnemy = 0;

        


        this.showTowerRange();
        this.showTowerPlacement();

        this.physics.add.overlap(this.enemiesGroup, this.projectiles, (enemy, projectile) =>
            this.damageEnemy(enemy,projectile)
        );

        this.startNextWave();

        this.buttonManager();        
    
    
    }
    

    update(time, delta) {
        if(this.totalEnemies > 0 && time > this.nextEnemy){
            const enemytype = this.getEnemyTypeForWave();
            const path = this.getPathForWave();
            const enemy = this.createEnemy(enemytype, path)
            this.enemiesGroup.add(enemy);
            if (enemy){
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + Phaser.Math.Between(200,1000) /this.gameSpeed;
                this.totalEnemies --;
            }
        }

        if(this.sellMode === true){
            this.shopMode.setTint(0x97FF00)
            this.input.off('pointerdown').on('pointerdown', pointer => this.sellTower(pointer));
        }else if (this.sellMode === false){
            this.input.off('pointerdown').on('pointerdown', pointer => this.placeTowers(pointer, GameObjects));
            this.shopMode.setTint(0xffffff)
        }

        this.checkEnemiesReachedEnd();

        if(this.totalEnemies === 0 && this.enemiesGroup.countActive() === 0){
            this.startNextWave();
        }

    }

    startNextWave(){
        this.wave++;

        if (this.wave === 5){
            this.totalEnemies = 1;
        } else{
            this.totalEnemies = this.wave * 5;
        }
        this.nextEnemy = 0;

        this.waveText.setText(`Wave: ${this.wave}`);
    }



    canPlaceTower(i,j){
        if(this.map){
            const index = i * 20 + j;
            return this.map[index] === 342;
        }
        return false;
    }
    
    placeTowers(pointer, GameObject){
        const i = Math.floor(pointer.y / 64);
        const j = Math.floor(pointer.x / 64);
    
        if(this.canPlaceTower(i, j)){
            this.currentPosition = {i, j};
            if(this.currency>= 125){
                this.setupShopTower(this.shopCrossBow, 125, 'Arrow')
            }
            if(this.currency>= 250){
                this.setupShopTower(this.shopAOETower, 250, 'AOETower')
            }


        }
    }

    sellTower(pointer){
        const i = Math.floor(pointer.y / 64)
        const j = Math.floor(pointer.x / 64)
        this.tower = this.getTowerAt(i,j)

            if(this.tower){
                this.currency += parseInt(this.tower.cost,10);
                this.currencyText.setText(`: ${this.currency}`);

                const index = i * 20 + j;
                this.map[index] = 342;

                if(this.currentPosition && this.currentPosition.i === i && this.currentPosition.j ===j)
                    this.currentPosition = null;
                
                this.tower.showRange(false)
                this.tower.setActive(false).setVisible(false).destroy();
            }
        }

    setupShopTower(shopTower, cost, towerType){

        shopTower.setInteractive().setScale(1.3).setTint('0xffffff');
        shopTower.on('pointerover', () => shopTower.setScale(1.5));
        shopTower.on('pointerout', () => shopTower.setScale(1.3));

        shopTower.on('pointerup', () => {
            if(this.currency >= cost){
                const existingTower = this.getTowerAt(this.currentPosition.i, this.currentPosition.j);
                if (!existingTower) {
                    this.placeTower(this.currentPosition.i, this.currentPosition.j, towerType);
                }
            }
            shopTower.setScale(1.3).setTint(0x666666);
        });
    }

    placeTower(i, j, towerType){
        const cost = towerType === 'Arrow' ? 125 : 250;
        this.currency -= cost;
        this.currencyText.setText(`: ${this.currency}`);
    
        let tower = this.towers.getFirstDead();
        if(!tower){
            if(towerType === 'Arrow'){
                tower = new Tower(this, 0, 0, this.map);
            } else if(towerType ==='AOETower'){
                tower = new AOETower(this, 0, 0, this.map);
            }   
            this.towers.add(tower);
        }
        tower.setActive(true);
        tower.setVisible(true);
        tower.place(i, j);
        this.shopAOETower.setTint(0x666666).disableInteractive()
        this.shopCrossBow.setTint(0x666666).disableInteractive()
    }



    showTowerRange() {
        this.input.on("pointermove", pointer => {
          const hoveredTower = this.getHoveredTower(pointer);
    
          if (hoveredTower) {
            hoveredTower.showRange(true);
          } else {
            const towers = this.towers.getChildren();
            for (const tower of towers ){
                tower.showRange(false);
            }
          }
        });
    }

    showTowerPlacement() {
        this.cursor = this.add.image(32, 32, "star");
        this.cursor.setScale(2);
        this.cursor.alpha = 1;
    
        this.input.on("pointermove", pointer => {
          const i = Math.floor(pointer.y / 64);
          const j = Math.floor(pointer.x / 64);
    
          if (this.canPlaceTower(i, j)) {
            this.cursor.setPosition(j * 64 + 32, i * 64 + 32);
            this.cursor.alpha = 0.8;
          } else {
            this.cursor.alpha = 0;
          }
        });
    }

    createGroup(){
        this.enemiesGroup = this.physics.add.group({
            classType: Goblin,
            runChildUpdate: true
        });

        this.towers = this.add.group({
            classType: Tower,
            runChildUpdate: true
        });

        this.projectiles = this.physics.add.group({
            classType: Projectile,AOEProjectile,
            runChildUpdate: true
        });

        this.towers.children.iterate(tower => {
            tower.createRangeGraphics();
        });
    }

    createEnemy(type, path) {
        switch(type) {
            case 'goblin':
                return new Goblin(this, path);
            case 'wolf':
                return new Wolf(this, path);
            case 'hobGoblin':
                return new HobGoblin(this, path);
            default: 
            return null;
        }
    }

    getEnemyTypeForWave() {
        if (this.wave >= 1 && this.wave <= 2) {
            return 'goblin';
        }
        if (this.wave >= 3 && this.wave <= 4) {
            return 'wolf';
        } 
        if(this.wave === 5 ){
            return 'hobGoblin';
        }
        if(this.wave >= 6){
            return Phaser.Math.RND.pick(['goblin', 'wolf', 'hobGoblin'])
        } 
        return 'goblin'
    }

    getPathForWave() {
        if (this.wave >= 1 && this.wave <= 2){
            return this.path1;
        }
        if (this.wave >= 3 && this.wave <= 4){
            return this.path2;
        }
        if (this.wave >= 5 && this.wave <= 10){
            return Phaser.Math.RND.pick([this.path1, this.path2]);
        }
        if (this.wave > 10){
            return Phaser.Math.RND.pick([this.path1, this.path2, this.path3]);
        }
        return this.path1;
    }


    checkEnemiesReachedEnd(){
        const enemiesTab = this.enemiesGroup.getChildren();
        for (let i = 0; i < enemiesTab.length; i++) {
            const enemy = enemiesTab[i];
            if (enemy.active && enemy.follower.t >= 1){
                this.heart.play("heart_anim");
                this.playerLives--;
                this.playerLivesText.setText(`: ${this.playerLives} / 10`);
                enemy.destroy();
                enemy.healthBar.destroy();
            }
            
        }
        if(this.playerLives === 0){
            this.gameOver();
        }
    }

    addProjectile(x, y , angle){
        let projectile;
        const i = Math.floor(y/64)
        const j = Math.floor(x/64)
        const towerType = this.getTowerAt(i,j)

        if(towerType.type === 'Arrow')
            projectile = new Projectile(this, 0, 0,this.damage);
        else if (towerType.type === 'AOE')
            projectile = new AOEProjectile(this, 0, 0,this.damage);
        this.projectiles.add(projectile);
        projectile.fire(x, y, angle);
    }

    getEnemy(x, y , distance){
        const enemyUnits = this.enemiesGroup.getChildren();
        for (const enemy of enemyUnits){
            if (enemy.active && Phaser.Math.Distance.Between(x, y, enemy.x, enemy.y) <= distance) {
                return enemy;
            }
        }
        return false;
    }

    getTowerAt(i, j) {
        const towers = this.towers.getChildren();
        for (const tower of towers) {
            const towerI = Math.floor(tower.y / 64);
            const towerJ = Math.floor(tower.x / 64);
            if (towerI === i && towerJ === j) {
                return tower;
            }
        }
        return null;
    }

    getHoveredTower(pointer) {
        const i = Math.floor(pointer.y / 64);
        const j = Math.floor(pointer.x / 64);
    
        const towers = this.towers.getChildren();
        for (const tower of towers) {
            const towerI = Math.floor(tower.y / 64);
            const towerJ = Math.floor(tower.x / 64);
            if (towerI === i && towerJ === j) {
                return tower;
            }
        }
    
        return null;
    }

    damageEnemy(enemy, projectile){
        this.damage = projectile.damage
        const reward = enemy.getReward();
        const score = enemy.getScore();
        if (enemy.active === true && projectile.active === true) {
            projectile.destroy();

            enemy.recieveDamage(this.damage);

            if(!enemy.isAlive()) {
                this.score += score;
                const scoreFormated = this.zeroPad(6);
                this.scoreText.setText(`Score: ${scoreFormated}`);
                this.gold.play("coin_anim");
                this.currency += reward;
                this.currencyText.setText(`: ${this.currency}`);
                
            }
        }
    }

    zeroPad(size){
        let stringNumber = String(this.score);
        while(stringNumber.length < (size || 2)){
            stringNumber = `0${stringNumber}`;
        }
        return stringNumber;
    }


    buttonManager(){
        // Pause button
        this.pauseButton = this.add.sprite(1230,50,"pauseButton");
        this.pauseButton.setScale(3);
        this.pauseButton.setInteractive();
        this.pauseButton.on("pointerover", () => {
            this.pauseButton.setTint(0xe0e0e0);
        });
        
        this.pauseButton.on("pointerout", () => {
            this.pauseButton.setTint(0xFFFFFF);
        });
        
        this.pauseButton.on("pointerup", () => {
            this.buttonSFX.play();
            this.backTrackSound.stop();
            this.pauseButton.play("pauseButton_anim");
            this.scene.pause();
            this.scene.launch('pauseGame');
        });

        // SoundButton music on/off
        
        this.soundButton = this.add.sprite(1170,50,"musicToMuteButton").setFrame(0);
        this.soundButton.setScale(3);
        this.soundButton.setInteractive();
        this.soundButton.on("pointerover", () => {
            this.soundButton.setTint(0xe0e0e0);
        });
        
        this.soundButton.on("pointerout", () => {
            this.soundButton.setTint(0xFFFFFF);
        });

        this.soundButton.on("pointerdown", () => {
            this.buttonSFX.play();
            this.soundButton.setFrame(1);
        });
        
        this.soundButton.on("pointerup", () => {
            this.soundButton.setFrame(0)
            if(this.backTrackSound.isPlaying){
                this.backTrackSound.stop()
            }else{
                this.soundButton.setTexture("mutedToMusicButton").setFrame(2);
                this.backTrackSound.play()
            }
        
        })
    this.backTrackSound.isPlaying = !this.backTrackSound.isPlaying


        this.tutoButton = this.add.sprite(1110,50,"tutoButton");
        this.tutoButton.setScale(3);
        this.tutoButton.setInteractive();
        this.tutoButton.on("pointerover", () => {
            this.tutoButton.setTint(0xe0e0e0);
        });

        this.tutoButton.on("pointerout", () => {
            this.tutoButton.setTint(0xFFFFFF);
        });

        this.tutoButton.on("pointerup", () => {
            this.buttonSFX.play();
            this.backTrackSound.stop();
            this.tutoButton.play("tutoButton_anim");
            this.scene.pause();
            this.scene.launch('tutoGame');
        });
    }

    toggleFastForward(){
        this.fastForwardButton.play("times2Button_anim");
        if (this.gameSpeed === 1) {
            this.gameSpeed = 2;
            
        } else {
            this.gameSpeed = 1;
        }
        this.time.timeScale = this.gameSpeed;
        
    }

    props(){
        this.base = this.add.image(700,656, "base").setScale(2);
        this.base.flipX = true;
        this.flagBase1 = this.add.sprite(809,577,"baseFlag");
        this.flagBase1.flipX = true;
        this.flagBase1.play("baseFlag_anim");
        this.flagBase2 = this.add.sprite(809,739,"baseFlag");
        this.flagBase2.flipX = true;
        this.flagBase2.play("baseFlag_anim");
        this.campFire = this.add.sprite(754, 680, "campFire").setScale(2);
        this.campFire.play("campFire_anim");

    }

    gameOver(){
        if(isAuthenticated()){
            this.registerScore();
        }
        this.backTrackSound.stop();
        this.scene.start("gameOver");
    }

    async registerScore() {
        
        const {score} = this;
        const {wave} = this;
        const { username, token } = getAuthenticatedUser();
        const options = {
            method: 'POST',
            body: JSON.stringify({
                username,
                score,
                wave
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        };

        const response = await fetch(`/api/scores`, options);
        if(!response.ok) {
            throw new Error(`fetch error:: : ${response.status} : ${response.statusText}`);
        }
    }

}

export default GameScene;