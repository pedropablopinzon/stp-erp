import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { JSONValue } from '../types/util.types';

export class CreateProgressLogDto {
  @IsNumber()
  @ApiProperty()
  readonly status: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly project_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly comment: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  readonly images_url: JSONValue;
}

export class UpdateProgressLogDto extends PartialType(CreateProgressLogDto) {}
