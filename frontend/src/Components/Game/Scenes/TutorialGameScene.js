import Phaser from "phaser";

class TutorialGameScene extends Phaser.Scene{
    constructor(){
        super("tutoGame");
    }

    create(){
        this.buttonSFX = this.sound.add("buttonSFX",{
            loop: false,
            volume: 0.2
        })

        this.tutoPage = this.add.image(0,0,"tutoPage");
        this.tutoPage.setOrigin(0,0);
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
            this.pauseButton.play("pauseButton_anim");
            this.scene.resume('playGame');
            this.scene.stop();
        });

        this.tutoButton = this.add.sprite(1110,50,"tutoButton");
        this.tutoButton.setScale(3);
        this.tutoButton.play("tutoButton_anim");
        this.tutoButton.setInteractive();
        this.tutoButton.on("pointerover", () => {
            this.tutoButton.setTint(0xe0e0e0);
        });

        this.tutoButton.on("pointerout", () => {
            this.tutoButton.setTint(0xFFFFFF);
        });

        this.tutoButton.on("pointerup", () => {
            this.buttonSFX.play();
            this.scene.resume('playGame');
            this.scene.stop();
            
        });
    }

}

export default TutorialGameScene