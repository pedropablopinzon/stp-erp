import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsNumber()
  @ApiProperty()
  readonly status: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {}
