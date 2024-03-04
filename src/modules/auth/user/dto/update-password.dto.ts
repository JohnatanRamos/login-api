import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'It must be of string type (password).' })
  @IsNotEmpty({ message: 'You must provide a newPassword' })
  newPassword: string;

  @IsString({ message: 'It must be of string type (currentPassword).' })
  @IsNotEmpty({ message: 'You must provide a currentPassword' })
  currentPassword: string;
}
