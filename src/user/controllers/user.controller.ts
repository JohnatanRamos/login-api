import { Body, Controller, Get, Param, Patch, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
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

  @Put('change-password/:id')
  changePassword(@Body() body: UpdatePasswordDto, @Param('id') idUser: string) {
    return this.userService.changePassword({...body, idUser});
  }
}
