export interface ILine {
    sx: number; // Tọa độ x bắt đầu của đường thẳng
    sy: number; // Tọa độ y bắt đầu của đường thẳng
    ex: number; // Tọa độ x kết thúc của đường thẳng
    ey: number; // Tọa độ y kết thúc của đường thẳng
    col: string; // Màu sắc của đường thẳng (ví dụ: "#FF0000" cho màu đỏ)
    is_moving: boolean;
    // get toạ độ
    bounds: () => [number, number, number, number];

    // draw on canvas
    draw: (context: CanvasRenderingContext2D) => void;

    checked: () => boolean;
}
