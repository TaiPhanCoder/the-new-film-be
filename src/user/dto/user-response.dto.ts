import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';

export class UserResponseDto {
  @ApiProperty({
    example: '270ca51e-4482-4a88-ac60-03f73d5cf0ed',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'JohnDoe',
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    example: Role.USER,
    description: 'User role',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    example: false,
    description: 'User active status',
  })
  isActive: boolean;
}
