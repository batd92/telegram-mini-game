import Phaser from 'phaser';

export class Coin extends Phaser.Physics.Arcade.Sprite {
    private alive: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'coin');
        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setGravityY(0);

        this.setDisplaySize(30, 30);
        this.setTint(0xffff00);

        this.flyOut();
    }

    private flyOut(): void {
        const angle = Phaser.Math.Between(0, 360);

        const velocityX = Math.cos(Phaser.Math.DegToRad(angle)) * 200;
        const velocityY = Math.sin(Phaser.Math.DegToRad(angle)) * 200;

        this.setVelocity(velocityX, velocityY);

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                this.destroyCoin();
            },
        });

        this.scene.tweens.add({
            targets: this,
            angle: 360,
            duration: 2000,
            repeat: -1,
        });
    }

    update(): void {
        if (!this.alive) return;
    }

    isAlive(): boolean {
        return this.alive;
    }

    destroyCoin(): void {
        this.alive = false;
        this.destroy();
    }
}
