export interface IBasket {
    width: number;
    height: number;
    x: number;
    y: number;
    fillHeight: number;
    speed: number;
    score: number;

    draw(ctx: CanvasRenderingContext2D): void;
    catchGold(goldY: number, goldX: number, goldRadius: number): boolean;
    incrementScore(): void;
}
