import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'database/schemas/user.schema';
import { Task } from 'database/schemas/task.schema';

export class ResTaskHistoryDto {

    @ApiProperty({ example: 85 })
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @ApiProperty({ example: '192.168.0.1' })
    @IsString()
    @IsNotEmpty()
    ip: string;

    @ApiProperty({ example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' })
    @IsString()
    @IsNotEmpty()
    browser: string;

    @ApiProperty({ example: 'extra data about the task' })
    @IsString()
    data: string;

    @ApiProperty({ type: User })
    user: User;

    @ApiProperty({ type: Task })
    task: Task;
}
