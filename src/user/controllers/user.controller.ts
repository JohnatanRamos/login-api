import { Body, Controller, Get, Param, Patch, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { RecoveryPasswordDto } from '../dto/recoveryPassword.dto';

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

  /**
   * Controller of the method send mail when forgots password.
   */
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.sendEmailRecoverPassword(email);
  }

  /**
   * Controller of the method recovery password.
   */
  @Public()
  @Post('recovery-password')
  async recoveryPassword(@Body() body: RecoveryPasswordDto) {
    return this.userService.recoveryPassword(body.password, body.token);
  }
}
