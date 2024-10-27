import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameHistoryDto {
    @ApiProperty({ example: 85 })
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @ApiProperty({ example: 'extra data about the task' })
    @IsString()
    @IsOptional()
    data: string;
}
