import { Body, Controller, Get, Patch, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @Patch()
  updateUSer(@Body() user: UpdateUserDto) {
    return this.userService.updateUser(user);
  }
}
