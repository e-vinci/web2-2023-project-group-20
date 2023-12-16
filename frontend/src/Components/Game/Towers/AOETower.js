import Phaser from "phaser";
import Projectile from "../AOEProjectile";

class Tower extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, map,cost,type,projectile) {
        super(scene, x, y, "AOETowerWeapon",);

        this.nextTic = 0;
        this.map = map;

        this.cost = '250'
        this.type = 'AOE'
        this.projectile = Projectile

        this.scene.add.existing(this);
        this.rangeGraphics = scene.add.graphics();
        this.play("AOETowerWeapon_anim");
        this.anims.stop();
    }

    place(i, j) {
        this.y = i * 64 + 64 / 2
        this.x = j * 64 + 64 / 2
        const index = i * 20 + j
        this.map[index] = 1
    }

    fire() {
        const enemy = this.scene.getEnemy(this.x, this.y, 200)
        if(enemy){
            const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
            this.scene.addProjectile(this.x, this.y, angle)
            this.angle = (angle + Math.PI / 2 ) * Phaser.Math.RAD_TO_DEG
        }
    }

    update(time, delta){
        if (time > this.nextTic) {
            const enemy = this.scene.getEnemy(this.x,this.y, 200)
            if(enemy){
                this.play("AOETowerWeapon_anim")
            } else {
                this.anims.stop()
            }
            this.fire()
            this.nextTic = time + 1500
        }
        this.updateRangeVisualization()
    }

    showRange(visible){
        this.rangeGraphics.visible = visible
    }

    createRangeGraphics() {
        this.rangeGraphics = this.scene.add.graphics()
        this.updateRangeVisualization()
        this.scene.add.existing(this.rangeGraphics)
    }

    updateRangeVisualization() {
        this.rangeGraphics.clear();
        this.rangeGraphics.lineStyle(2, 0xffffff, 0.3);
        this.rangeGraphics.beginPath();
        this.rangeGraphics.arc(this.x, this.y, 200, 0, 2 * Math.PI);
        this.rangeGraphics.strokePath();
    }
}

export default Tower