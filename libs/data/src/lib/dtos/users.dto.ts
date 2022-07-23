import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly display_name: string;

  @IsNumber()
  @ApiProperty()
  readonly status: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
