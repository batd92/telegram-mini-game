import { IPlank } from './interface/IPlank';
import { Line } from './Line';
import { PLANK_SETTINGS } from './Constants';


export class Plank implements IPlank {
    planks: Line[];
    curr: Line | null;

    static MAX_PLANKS: number = PLANK_SETTINGS.MAX_PLANKS;

    constructor() {
        this.planks = [];
        this.curr = null;
    }

    size(): number {
        return this.planks.length;
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const plank of this.planks) {
            plank.draw(context);
        }
        if (this.curr !== null) {
            this.curr.draw(context);
        }
    }

    start(x: number, y: number): void {
        if (this.curr === null) {
            this.curr = new Line(x, y, x, y);
        }
    }

    fin(x: number, y: number): void {
        if (this.curr !== null) {
            this.curr.ex = x;
            this.curr.ey = y;
            if (this.curr.checked()) {
                if (this.planks.length >= Plank.MAX_PLANKS) {
                    this.planks.shift();
                }
                this.planks.push(this.curr);
            }
            this.curr = null;
        }
    }

    roll(x: number, y: number): void {
        if (this.curr !== null) {
            this.curr.ex = x;
            this.curr.ey = y;
        }
    }
}
