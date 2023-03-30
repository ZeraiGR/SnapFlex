import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { USER_NOT_FOUNT_ERROR } from './user.constants';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException(USER_NOT_FOUNT_ERROR);
    return user;
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException(USER_NOT_FOUNT_ERROR);
    return user;
  }
}
