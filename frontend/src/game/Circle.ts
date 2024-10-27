import { IShape } from './interface/IShape';

export class Circle implements IShape {
    x: number;
    y: number;
    c: HTMLCanvasElement;
    score: number = 0;
    r: number;

    static image: HTMLImageElement | null = null;
    static FPS: number = 60;
    private scaleFactor: number = 0.99;

    constructor(c: HTMLCanvasElement) {
        this.c = c;
        this.x = c.width / 2;
        this.y = c.height / 2;
        this.r = 110;
        this.loadImage();
    }

    private loadImage(): void {
        if (!Circle.image) {
            Circle.image = new Image();
            Circle.image.src = '/images/water.svg';
            Circle.image.onload = () => console.log('Image loaded successfully');
            Circle.image.onerror = (err) => {
                console.error('Error loading image:', err);
                Circle.image = null;
            };
        }
    }

    static random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    draw(context: CanvasRenderingContext2D): boolean {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.closePath();
        context.clip();

        if (Circle.image && Circle.image.complete) {
            const imgSize = this.r * 2 * this.scaleFactor;
            context.drawImage(Circle.image, this.x - imgSize / 2, this.y - imgSize / 2, imgSize, imgSize);
        } else {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }

        context.restore();
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.closePath();
        context.lineWidth = 2;
        context.stroke();

        return true;
    }

    addScore(points: number): void {
        this.score += points;
    }
}
