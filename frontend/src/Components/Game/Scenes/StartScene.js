import Phaser from "phaser";

class StartScene extends Phaser.Scene {
    constructor() {
        super("title")
    }


    create(){
        this.buttonSFX = this.sound.add("buttonSFX",{
            loop: false,
            volume: 0.2
        })

        // Load menu sound
        
        this.menuMusic = this.sound.add("mainMenuMusic", {
            loop:true,
            volume:0.05
        })
        this.menuMusic.play()
        

        // Load Menu
        this.background = this.add.image(0,0, "gameMenu");
        this.background.setDisplayOrigin(0,0)
        /* this.background.setOrigin(0,0) */

        // Button to next Scene
        const button = this.add.text(this.scale.width/2, this.scale.height/1.5, 'Start',
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
            this.menuMusic.destroy()
        });


        this.soundButton = this.add.sprite(1230,50,"musicToMuteButton").setFrame(0);
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
            if(this.menuMusic.isPlaying){
                this.menuMusic.stop()
            }else if(!this.menuMusic.isPlaying){
                this.soundButton.setTexture("mutedToMusicButton").setFrame(2);
                this.menuMusic.play()
            }
            
        }) 
        this.menuMusic.isPlaying = !this.menuMusic.isPlaying

    }
}

export default StartScene;

