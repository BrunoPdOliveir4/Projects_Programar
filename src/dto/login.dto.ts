import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john.doe', description: 'The username of the user' })
  username: string;

  @ApiProperty({ example: '12345', description: 'The password of the user' })
  password: string;
}
