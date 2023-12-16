import Phaser from "phaser";

class GameOverScene extends Phaser.Scene{
    constructor() {
        super("gameOver")
    }

    create(){
        const centerX = this.scale.width * 0.5;
        const centerY = this.scale.height * 0.5;
        this.background = this.add.image(0,0, "gameMap");
        this.background.setOrigin(0,0);
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, "GAME OVER").setOrigin(0.5);

        const button = this.add.text(centerX, centerY + 140, 'NOUVELLE PARTIE',
            {
                fontFamily: 'Candara, Arial',
                fontSize: '32px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        button.setInteractive();
        button.on('pointerover', () => { button.setFontSize(48); });
        button.on('pointerout', () => { button.setFontSize(32); });
        button.on('pointerdown', () => {
            this.scene.start('playGame');
        });

    }

}

export default GameOverScene