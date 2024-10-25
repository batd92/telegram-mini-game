import { IBasket } from './interface/IBasket';

export class Basket implements IBasket {
    width: number;
    height: number;
    x: number;
    y: number;
    speed: number;
    score: number;
    fillHeight: number;

    static image: HTMLImageElement | null = null;
    static margin: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.width = 120;
        this.height = 120;
        this.x =
            Basket.margin +
            Math.random() * (canvas.width - this.width - 2 * Basket.margin);
        this.y = canvas.height - this.height - 10;
        this.speed = 10;
        this.score = 0;
        this.fillHeight = 0;

        if (!Basket.image) {
            Basket.image = new Image();
            Basket.image.src = '/images/basket.svg';
            Basket.image.onload = () => {};
            Basket.image.onerror = (err) => {
                console.error('Error loading image:', err);
                Basket.image = null;
            };
        }
    }

    draw(context: CanvasRenderingContext2D) {
        if (Basket.image && Basket.image.complete) {
            context.drawImage(
                Basket.image,
                this.x,
                this.y,
                this.width,
                this.height,
            );

            context.fillStyle = 'rgba(255, 215, 0, 0.7)';
            context.fillRect(
                this.x,
                this.y + this.height - this.fillHeight,
                this.width,
                this.fillHeight,
            );
        }
    }

    catchGold(goldY: number, goldX: number, goldRadius: number): boolean {
        const basketTop = this.y;
        const basketLeft = this.x;
        const basketRight = this.x + this.width;

        const isWithinX =
            goldX + goldRadius > basketLeft && goldX - goldRadius < basketRight;
        const isWithinY = goldY + goldRadius >= basketTop;
        if (isWithinX && isWithinY) {
            this.incrementScore();
            return true;
        }
        return false;
    }

    incrementScore() {
        this.score += 1;
        this.fillHeight += this.height / 10;
        if (this.fillHeight > this.height) {
            this.fillHeight = this.height;
        }
    }

    drawBasket(context: CanvasRenderingContext2D) {
        this.draw(context);
    }

    resetPosition(canvasWidth: number, canvasHeight: number) {
        this.x = (canvasWidth - this.width) / 2;
        this.y = canvasHeight - this.height - 10;
        this.score = 0;
    }
}
