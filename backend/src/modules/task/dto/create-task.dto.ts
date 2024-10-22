import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly des: string;

    @IsNotEmpty()
    readonly link: string;
}
