import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Johnathan Doe',
    description: 'The updated name of the user',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'john.doe.new@example.com',
    description: 'The updated email of the user',
    uniqueItems: true,
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}
