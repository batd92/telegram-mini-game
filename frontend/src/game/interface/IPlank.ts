import { ILine } from './ILine';

export interface IPlank {
    planks: ILine[]; // Mảng chứa các đối tượng LineImpl
    curr: ILine | null; // Đối tượng LineImpl hiện tại (đang vẽ)

    size(): number; // Phương thức trả về kích thước của mảng planks
    draw(context: CanvasRenderingContext2D): void; // Phương thức vẽ các planks lên canvas
    start(x: number, y: number): void; // Phương thức bắt đầu vẽ plank mới
    fin(x: number, y: number): void; // Phương thức kết thúc việc vẽ plank
    roll(x: number, y: number): void; // Phương thức cập nhật vị trí cuối của plank hiện tại
}
