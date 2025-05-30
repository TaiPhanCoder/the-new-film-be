import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

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

  @ApiPropertyOptional({
    example: 'johndoe_updated',
    description: 'The updated username of the user',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: Role.ADMIN,
    description: 'The updated role of the user',
    enum: Role,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
