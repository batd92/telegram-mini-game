export class Coin implements Coin {
    x: number;
    y: number;
    radius: number = 10;
    duration: number = 60;
    velocityX: number;
    velocityY: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.velocityX = (Math.random() - 0.5) * 4;
        this.velocityY = (Math.random() - 0.5) * 4;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.duration -= 1;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "gold";
        context.fill();
        context.closePath();
    }

    isAlive() {
        return this.duration > 0;
    }
}