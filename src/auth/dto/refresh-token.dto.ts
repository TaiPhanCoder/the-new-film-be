import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Refresh token to get new access token',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
