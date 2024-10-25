import { IBall } from './IBall'; // Nhớ import lớp Ball và interface IBall

export interface IBalls {
    balls: IBall[]; // Mảng chứa các bóng
    f: number; // Khung hình hiện tại
    canvasWidth: number; // Chiều rộng canvas
    canvasHeight: number; // Chiều cao canvas

    fr(context: CanvasRenderingContext2D, planks: any): void; // Phương thức xử lý khung hình
    gen(): void; // Phương thức sinh bóng mới
}
