import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskHistoryDto {
    @ApiProperty({ example: '612b1234abcd5678ef654321' })
    @IsString()
    @IsNotEmpty()
    task_id: string;

    @ApiProperty({ example: 85 })
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @ApiProperty({ example: 'extra data about the task', required: false })
    @IsString()
    data?: string;
}
