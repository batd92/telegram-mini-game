import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameHistoryDto {
    @ApiProperty({ example: 85 })
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @ApiProperty({ example: 'extra data about the task' })
    @IsString()
    data: string;
}
