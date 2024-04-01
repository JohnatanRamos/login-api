import { Body, Controller, Get, Param, Patch, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { RecoveryPasswordDto } from '../dto/recoveryPassword.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ description: 'Return all users', summary: 'Return all aplication users' })
  @Public()
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create new user' })
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @ApiOperation({ summary: 'Update an exist user' })
  @Patch()
  updateUSer(@Body() user: UpdateUserDto) {
    return this.userService.updateUser(user);
  }

  @ApiOperation({ summary: 'Update password by user' })
  @Put('change-password/:id')
  changePassword(@Body() body: UpdatePasswordDto, @Param('id') idUser: string) {
    return this.userService.changePassword({...body, idUser});
  }

  /**
   * Controller of the method send mail when forgots password.
   */
  @ApiOperation({ summary: 'Send email to recover password when the user forgets it' })
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.sendEmailRecoverPassword(email);
  }

  /**
   * Controller of the method recovery password.
   */
  @ApiOperation({ summary: 'Change password when the user forgets it' })
  @Public()
  @Post('recovery-password')
  async recoveryPassword(@Body() body: RecoveryPasswordDto) {
    return this.userService.recoveryPassword(body.password, body.token);
  }
}
