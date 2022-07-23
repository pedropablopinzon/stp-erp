import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogCheckInOutDto {
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
  readonly user_id: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly check_in_at: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  readonly refDocumcheck_out_atentDate: Date;
}

export class UpdateLogCheckInOutDto extends PartialType(CreateLogCheckInOutDto) {}
