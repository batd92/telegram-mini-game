export interface ResTaskDto {
    _id: string;
    title: string;
    link: string;
    des: string;
    status: number;
    task_history: {
        score: number;
        ip: string; 
        browser: string;
    }
}