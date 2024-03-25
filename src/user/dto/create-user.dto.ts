import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'It must be of string type (name).' })
  @IsNotEmpty({ message: 'You must provide a name' })
  name: string;

  @IsString({ message: 'It must be of string type (lastName).' })
  @IsOptional()
  lastName: string;

  @IsString({ message: 'It must be of string type (email).' })
  @IsNotEmpty({ message: 'You must provide a email' })
  @IsEmail({}, { message: 'It must comply with the standards of an email.' })
  email: string;

  @IsString({ message: 'It must be of string type (password).' })
  @IsNotEmpty({ message: 'You must provide a password' })
  password: string;

  @IsBoolean({ message: 'It must be of boolean type (status)' })
  @IsNotEmpty({ message: 'You must provide a status.' })
  state: boolean;

  @IsMongoId({ message: 'It must be of MongoId type (role).' })
  @IsNotEmpty({ message: 'You must provide a role' })
  role: string;

  // @IsMongoId({ message: 'It must be of MongoId type (updateBy).' })
  // @IsNotEmpty({ message: 'You must provide a updateBy' })
  // updateBy: string;
}
