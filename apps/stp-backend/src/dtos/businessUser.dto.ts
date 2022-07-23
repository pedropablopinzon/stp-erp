import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusinessUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly business_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: string;

  @IsNumber()
  @ApiProperty()
  readonly status: number;
}

export class UpdateBusinessUserDto extends PartialType(CreateBusinessUserDto) {}
