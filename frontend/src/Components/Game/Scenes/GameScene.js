import Phaser, { GameObjects } from "phaser";
import Goblin from "../Enemies/Goblin";
import Wolf from "../Enemies/Wolf";
import HobGoblin from "../Enemies/HobGoblin";
import Projectile from "../Projectile";
import Tower from "../Towers/Tower";
import AOETower from "../Towers/AOETower";

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
        this.wave = 0;
        this.waveText = null;
        this.currency = 10000;
    }
    
    create(){
        this.background = this.add.image(0,0, "gameMap");
        this.background.setOrigin(0,0);
        this.add.text(20,20, "GameScene");
        this.map = placementTilesData;
        this.props();
        this.playerLives = 10;
        this.nextWaveTime = 0;
        this.gameSpeed = 1;
        this.uiContainer = this.add.container(this.game.config.width / 2, 20);


        // Creating backTrackSound
        this.backTrackSound = this.sound.add("backTrackSound",{
            loop:true,
            volume:0.05
        })
        this.backTrackSound.play()

        this.heart = this.add.image(400,830,"Heart")
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

        this.gold = this.add.image(80,820,"goldCoin")
        this.currencyText = this.add.text(-530, 788, `: ${this.currency}`,{
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        
        this.uiContainer.add(this.playerLivesText);
        this.uiContainer.add(this.waveText);
        this.uiContainer.add(this.currencyText);
        this.add.existing(this.uiContainer);


        this.shopCrossBow = this.add.image(900,810,"crossbow").setTint(0x666666)
        this.crossBowPrice = this.add.text(883,840,'125|)')
        this.shopAOETower = this.add.image(1000,810,"slowingTower").setTint(0x666666)
        this.slowingTowerPrice = this.add.text(985,840,'250')
        this.soldingButton = this.add.text(1200,810,"SOLD").setInteractive()
        


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

        this.input.on('pointerdown', pointer => this.placeTowers(pointer,GameObjects));
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
    
    placeTowers(pointer,GameObject){
        const i = Math.floor(pointer.y / 64)
        const j = Math.floor(pointer.x /64)

        if(this.canPlaceTower(i,j)){
            this.currentPosition = {i,j}
            this.shopCrossBow.setInteractive().setScale(1.3).setTint('0xffffff')
            this.shopAOETower.setInteractive().setScale(1.3).setTint('0xffffff')
            
            this.shopCrossBow.on('pointerover',() => {
                this.shopCrossBow.setScale(1.5)
            })

            this.shopCrossBow.on('pointerout',() => {
                this.shopCrossBow.setScale(1.3)
            })

            this.shopCrossBow.on('pointerup',()=>{
                if(this.currency >= 125){
                    const existingTower = this.getTowerAt(this.currentPosition.i,this.currentPosition.j);
                    if (!existingTower) {
                        this.placeArrowTower(this.currentPosition.i,this.currentPosition.j) 
                    }            
                }
                this.shopCrossBow.setScale(1.3).setTint(0x666666)
            })

            this.shopAOETower.on('pointerover',() => {
                this.shopAOETower.setScale(1.5)
            })

            this.shopAOETower.on('pointerout',() => {
                this.shopAOETower.setScale(1.3)
            })

            this.shopAOETower.on('pointerup',()=>{
                if(this.currency >= 250 ){
                    const existingTower = this.getTowerAt(i, j);
                    if (!existingTower) {
                        this.placeAOETower(this.currentPosition.i,this.currentPosition.j)
                    }
                }
            })
        }   
        
    }

    placeArrowTower(i,j){
        this.currency -= 125;
        this.currencyText.setText(`: ${this.currency}`);

        let tower = this.towers.getFirstDead();
        if(!tower){
            tower = new Tower(this, 0, 0, this.map);
            this.towers.add(tower);
        }
        tower.setActive(true);
        tower.setVisible(true);
        tower.place(this.currentPosition.i,this.currentPosition.j);
    }

    placeAOETower(i,j){
        this.currency -= 250
        this.currencyText.setText(`: ${this.currency}`);
        let tower = this.towers.getFirstDead();
        if(!tower){
            tower = new AOETower(this, 0, 0, this.map);
            this.towers.add(tower);
        }
        tower.setActive(true);
        tower.setVisible(true);
        tower.place(i,j);

    }
/*  
    placeTowers(pointer) {
        const i = Math.floor(pointer.y / 64);
        const j = Math.floor(pointer.x / 64);
        const towerCost = 125;

       if (this.canPlaceTower(i,j) && this.currency >= towerCost){
        this.currency -= towerCost;
        this.currencyText.setText(`: ${this.currency}`);

        const index = i * 20 + j;
        let tower = this.towers.getFirstDead();
        if(!tower){
            tower = new Tower(this, 0, 0, this.map);
            this.towers.add(tower);
        }
        tower.setActive(true);
        tower.setVisible(true);
        tower.place(i,j);
       }
    } 
*/

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
            classType: Projectile,
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
        const projectile = new Projectile(this, 0, 0);
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
        this.damage = 30;
        const reward = enemy.getReward();
        if (enemy.active === true && projectile.active === true) {
            projectile.destroy();

            enemy.recieveDamage(this.damage);

            if(!enemy.active) {
                this.currency += reward;
                this.currencyText.setText(`: ${this.currency}`);
                
            }
        }
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
            this.pauseButton.play("pauseButton_anim");
            this.scene.pause();
            this.scene.launch('pauseGame');
        });

        // Fast forward button
        this.fastForwardButton = this.add.sprite(1170, 50, "times2Button").setScale(3);
        this.fastForwardButton.setInteractive();
        this.fastForwardButton.on("pointerover", () => {
            this.fastForwardButton.setTint(0xe0e0e0);
        });
        
        this.fastForwardButton.on("pointerout", () => {
            this.fastForwardButton.setTint(0xFFFFFF);
        });
        this.fastForwardButton.on("pointerup", () => {
            this.fastForwardButton.play("times2Button_anim");
            this.toggleFastForward();
        });


        this.soundButton = this.add.sprite(1110,51,"menuSoundButton").setFrame(2);
        this.soundButton.setScale(3);
        this.soundButton.setInteractive();
        this.soundButton.on("pointerover", () => {
            this.soundButton.setTint(0xe0e0e0);
        });
        
        this.soundButton.on("pointerout", () => {
            this.soundButton.setTint(0xFFFFFF);
        });

        this.soundButton.on("pointerdown", () => {
            this.soundButton.setFrame(1);
        });
        
        this.soundButton.on("pointerup", () => {
            this.soundButton.setFrame(0)
            if(this.backTrackSound.isPlaying){
                this.backTrackSound.stop()
            }else{
                this.backTrackSound.play()
            }
            
        })
        this.backTrackSound.isPlaying = !this.backTrackSound.isPlaying
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
        this.scene.start("gameOver");
    }



}

export default GameScene;