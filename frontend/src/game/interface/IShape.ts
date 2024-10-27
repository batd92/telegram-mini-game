export interface IShape {
    x: number;
    y: number;
    score: number;
    c: HTMLCanvasElement;
    r: number;

    draw(context: CanvasRenderingContext2D, planks: any): boolean;
}
