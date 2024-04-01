import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.generateJWT(req.user);
  }
}
