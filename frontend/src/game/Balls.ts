import { Ball } from './Ball';
import { IBalls } from './interface/IBalls';
import { BALLS_SETTINGS } from './Constants';
import { Plank } from './Plank';

export class Balls implements IBalls {
    balls: Ball[];
    f: number;
    canvasWidth: number;
    canvasHeight: number;

    static MAX_BALLS: number = BALLS_SETTINGS.MAX_BALLS;
    static NEXT_BALL_INTERVAL: number = BALLS_SETTINGS.NEXT_BALL_INTERVAL;

    constructor(canvas: HTMLCanvasElement) {
        this.balls = [new Ball(canvas)];
        this.f = 0;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }

    fr(context: CanvasRenderingContext2D, planks: any): void {
        this.f++;
        if (this.f >= Balls.NEXT_BALL_INTERVAL) {
            this.f = 0;
            if (this.balls.length < Balls.MAX_BALLS) {
                this.gen();
            }
        }

        for (let i = this.balls.length - 1; i >= 0; i--) {
            const b = this.balls[i];
            if (!b.draw(context, planks)) {
                this.balls.splice(i, 1);
            }
        }
    }

    gen(): void {
        if (Array.isArray(this.balls) && this.balls[0]) {
            this.balls.push(new Ball(this.balls[0].c));
        }
    }

    reset(canvas: HTMLCanvasElement) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.balls = [];
    }
}