export interface IBall {
    x: number; // Tọa độ x của bóng
    y: number; // Tọa độ y của bóng
    r: number; // Bán kính của bóng
    col: string; // Màu sắc của bóng
    vx: number; // Tốc độ theo trục x
    vy: number; // Tốc độ theo trục y
    c: HTMLCanvasElement; // Canvas nơi bóng sẽ được vẽ

    draw(context: CanvasRenderingContext2D, planks: any): boolean; // Phương thức vẽ bóng
    roll(planks: any): boolean; // Phương thức xử lý chuyển động của bóng
    rebound(sp: number[], n: number[]): number[]; // Phương thức để xử lý va chạm
}
