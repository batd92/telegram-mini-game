export interface ICoin {
    x: number;
    y: number;
    radius: number;
    duration: number;
    velocityX: number;
    velocityY: number;

    update(): void;
    draw(context: CanvasRenderingContext2D): void;
    isAlive(): boolean;
}