import { IsNotEmpty, IsString } from "class-validator";

export class RecoveryPasswordDto {
  @IsString({ message: 'It must be of string type (password).' })
  @IsNotEmpty({ message: 'You must provide a password' })
  password: string;

  @IsString({ message: 'It must be of string type (token).' })
  @IsNotEmpty({ message: 'You must provide a token' })
  token: string;
}
