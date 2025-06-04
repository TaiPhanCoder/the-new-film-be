import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwic3ViIjoiY2UwNGQ1ZjUtYjU1OS00YjQ2LWFjMmMtYTY0MDM5N2RkZDYxIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNzE2OTg5MzU0LCJleHAiOjE3MTcwNzU3NTR9.SXJjFpG_ZVZzZ0ZzZ0ZzZ0ZzZ0ZzZ0ZzZ0ZzZ0ZzZ0Zz',
    description: 'Access token for the authenticated user',
  })
  access_token: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Refresh token for getting new access token',
  })
  refresh_token: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59.000Z',
    description: 'Expiration date of the refresh token',
  })
  refresh_token_expires_at: Date;
}
