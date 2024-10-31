import { IsNotEmpty } from 'class-validator';
export class UpdateTaskDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly link: string;
}
