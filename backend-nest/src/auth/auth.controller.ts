import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('test')
  test(@Body() dto: any) {
    return this.authService.create(dto);
  }
}
