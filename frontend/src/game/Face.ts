import Phaser from 'phaser';
import { Coin } from './Coin';

export class Face extends Phaser.Physics.Arcade.Sprite {
    private score: number = 0;
    private isAnimating: boolean = false;
    private indicatorCircle: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'shiba');
        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
        this.setInteractive();

        this.indicatorCircle = this.scene.add.arc(x, y, 150, 0, 360, false, 0xffffff, 0.01);
        this.indicatorCircle.setStrokeStyle(5, 0xffff00);
        this.indicatorCircle.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.indicatorCircle);
        


        this.on('pointerdown', this.handleClick, this);
    }

    private handleClick(): void {
        if (this.isAnimating) return;

        this.addScore(1);
        this.isAnimating = true;

        this.scene.tweens.add({
            targets: this,
            scale: 1.2,
            duration: 150,
            yoyo: true,
            onComplete: () => {
                this.isAnimating = false;
                this.spawnCoins();
            },
        });
    }

    private spawnCoins(): void {
        const coinCount = 5;
        const baseVelocity = 300;

        for (let i = 0; i < coinCount; i++) {
            const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
            const distance = Phaser.Math.Between(50, 100);
            const x = this.x + Math.cos(angle) * distance;
            const y = this.y + Math.sin(angle) * distance;

            const coin = new Coin(this.scene, x, y);
            const velocityX = Math.cos(angle) * baseVelocity * Phaser.Math.Between(0.8, 1.2);
            const velocityY = Math.sin(angle) * baseVelocity * Phaser.Math.Between(0.8, 1.2);

            coin.setVelocity(velocityX, velocityY);

            this.scene.tweens.add({
                targets: coin,
                alpha: 0,
                duration: 2000,
                onComplete: () => {
                    coin.destroyCoin();
                },
            });
        }
    }

    addScore(points: number): void {
        this.score += points;
    }

    getScore(): number {
        return this.score;
    }
}
