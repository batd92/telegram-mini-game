import { IBall } from './interface/IBall';
import { COLORS, BALL_SETTINGS } from './Constants';

export class Ball implements IBall {
    x: number;
    y: number;
    r: number;
    col: string;
    vx: number;
    vy: number;
    c: HTMLCanvasElement;

    static image: HTMLImageElement | null = null;
    static GRAVITY: number = BALL_SETTINGS.GRAVITY;
    static FPS: number = BALL_SETTINGS.FPS;

    constructor(c: HTMLCanvasElement) {
        this.c = c;
        this.x = c.width / 2;
        this.y = 0;
        this.r = Ball.random(2, 20);
        this.col = `rgb(${COLORS.BALL_COLOR})`;
        this.vx = 0;
        this.vy = 0;

        if (!Ball.image) {
            Ball.image = new Image();
            Ball.image.src = '/images/gold-coin-dollar-icon.svg';
            Ball.image.onload = () => {};
            Ball.image.onerror = (err) => {
                console.error('Error loading image:', err);
                Ball.image = null;
            };
        }
    }

    static random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    draw(context: CanvasRenderingContext2D, planks: any): boolean {
        if (!this.roll(planks)) {
            return false;
        }
        if (Ball.image && Ball.image.complete) {
            context.save();

            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            context.closePath();
            context.clip();

            context.drawImage(
                Ball.image,
                this.x - this.r,
                this.y - this.r,
                this.r * 2,
                this.r * 2,
            );

            context.restore();

            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            context.closePath();
            context.strokeStyle = '#ffffff';
            context.lineWidth = 2;
            context.stroke();
        } else {
            context.fillStyle = this.col;
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            context.fill();
            context.closePath();
        }

        return true;
    }

    roll(planks: any): boolean {
        this.vy += Ball.GRAVITY / Ball.FPS;
        let nY = this.y + this.vy / Ball.FPS;
        let nX = this.x + this.vx / Ball.FPS;
        const s = planks.size();

        for (let i = 0; i < s; i++) {
            const _p = planks.planks[i];
            const b =
                (_p.ex - _p.sx) * (nY - this.y) -
                (_p.ey - _p.sy) * (nX - this.x);
            if (b === 0) continue;

            const ang = [this.x - _p.sx, this.y - _p.sy];
            const dr = ((nY - this.y) * ang[0] - (nX - this.x) * ang[1]) / b;
            const ds =
                ((_p.ey - _p.sy) * ang[0] - (_p.ex - _p.sx) * ang[1]) / b;

            if (dr > 0 && dr < 1 && ds > 0 && ds < 1) {
                let a = _p.ex === _p.sx ? 0 : (_p.ey - _p.sy) / (_p.ex - _p.sx);
                let b = -(a * _p.sx) - _p.sy;
                let a1 = nX === this.x ? 0 : (nY - this.y) / (nX - this.x);
                let r = Math.sqrt(Ball.random(5, 7) / 10);

                if (a1 * a === -1) {
                    this.vy *= -r;
                    this.vx *= -r;
                } else {
                    a =
                        _p.ex === _p.sx
                            ? 0
                            : -1 / ((_p.ey - _p.sy) / (_p.ex - _p.sx));
                    b = -(a * _p.sx) + _p.sy;

                    const p = [1, a + b];
                    const p2 = [2, a * 2 + b];
                    const w = Math.sqrt(
                        Math.pow(p2[0] - p[0], 2) + Math.pow(p2[1] - p[1], 2),
                    );

                    const ref = this.rebound(
                        [this.vx, this.vy],
                        [(p2[0] - p[0]) / w, (p2[1] - p[1]) / w],
                    );
                    this.vx = r * ref[0];
                    this.vy = r * ref[1];
                }
                nY = this.y + this.vy / Ball.FPS;
                nX = this.x + this.vx / Ball.FPS;
                break;
            }
        }

        this.y = nY;
        this.x = nX;

        if (this.y > this.c.height || this.x > this.c.width || this.x < 0) {
            return false;
        }

        return true;
    }

    rebound(sp: number[], n: number[]): number[] {
        const t = -(n[0] * sp[0] + n[1] * sp[1]) / (n[0] * n[0] + n[1] * n[1]);
        return [sp[0] + t * n[0] * 2.0, sp[1] + t * n[1] * 2.0];
    }
}
