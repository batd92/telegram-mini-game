import { ILine } from './interface/ILine';
import { COLORS, LINE_SETTINGS } from './Constants';

export class Line implements ILine {
    sx: number;
    sy: number;
    ex: number;
    ey: number;
    col: string;
    is_moving: boolean = false;

    static MIN_LENGTH: number = LINE_SETTINGS.MIN_LENGTH;

    constructor(sx: number, sy: number, ex: number, ey: number) {
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
        this.col = `rgb(${COLORS.LINE_COLOR})`;
    }

    bounds(): [number, number, number, number] {
        const left = Math.min(this.sx, this.ex);
        const right = Math.max(this.sx, this.ex);
        const top = Math.min(this.sy, this.ey);
        const bottom = Math.max(this.sy, this.ey);
        return [left, top, right, bottom];
    }

    draw(context: CanvasRenderingContext2D): void {
        context.lineWidth = LINE_SETTINGS.LINE_WIDTH;
        context.strokeStyle = `rgb(${COLORS.LINE_COLOR})`;
        context.shadowColor = COLORS.SHADOW_COLOR;
        context.shadowBlur = LINE_SETTINGS.SHADOW_BLUR;
        context.shadowOffsetX = LINE_SETTINGS.SHADOW_OFFSET_X;
        context.shadowOffsetY = LINE_SETTINGS.SHADOW_OFFSET_Y;

        context.beginPath();
        context.moveTo(this.sx, this.sy);
        context.lineTo(this.ex, this.ey);
        context.stroke();
        context.closePath();
    }

    checked(): boolean {
        return (
            Math.sqrt(
                Math.pow(this.ex - this.sx, 2) + Math.pow(this.ey - this.sy, 2),
            ) > Line.MIN_LENGTH
        );
    }
}
