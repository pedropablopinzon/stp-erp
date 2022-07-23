import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { JSONValue } from '../types/util.types';

export class CreateExpenseRecordDto {
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @ApiProperty()
  readonly expected_amount: number;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  readonly images_url: JSONValue;
}

export class UpdateExpenseRecordDto extends PartialType(
  CreateExpenseRecordDto
) {}
