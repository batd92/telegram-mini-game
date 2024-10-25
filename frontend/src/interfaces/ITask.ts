import { ITaskHistory } from "./ITaskHistory";

export interface ITask {
    _id: string;
    title: string;
    link: string;
    des: string;
    score: number;
    history: ITaskHistory;
}