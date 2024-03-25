import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
  @IsNotEmpty({ message: 'You must provide a _id' })
  @IsString({ message: 'It must be of string type (_id).' })
  _id: string;
}
