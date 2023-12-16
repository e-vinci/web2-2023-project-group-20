import Phaser from "phaser";
import logoPng from "../../../assets/logo.png"

class BootScene extends Phaser.Scene{
    constructor() {
        super("boot");
    }

    preload(){
        this.load.image("logo", logoPng);
    }

    create(){
        this.scene.start('Preload')
    }

}

export default BootScene