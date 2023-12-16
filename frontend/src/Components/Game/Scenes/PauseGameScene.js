import Phaser from "phaser";

class PauseGameScene extends Phaser.Scene{
    constructor(){
        super("pauseGame");
    }

    create(){
        this.buttonSFX = this.sound.add("buttonSFX",{
            loop: false,
            volume: 0.2
        })
        this.backTrackSound = this.sound.add("bgm",{
            loop:true,
            volume:0.05
        })
        this.pauseButton = this.add.sprite(1230,50,"pauseButton");
        this.pauseButton.setScale(3);
        this.pauseButton.play("pauseButton_anim");
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
        this.backTrackSound.isPlaying = !this.backTrackSound.isPlaying
    }

}

export default PauseGameScene