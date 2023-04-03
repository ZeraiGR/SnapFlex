import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { USER_NOT_FOUNT_ERROR } from './user.constants';
import { UserService } from './user.service';
import { UserDocument } from './schemas';
import { IdValidationPipe } from 'src/common/pipes/id.validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<UserDocument> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException(USER_NOT_FOUNT_ERROR);
    return user;
  }

  @Get('byEmail/:email')
  async findByEmail(@Param('email') email: string): Promise<UserDocument> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException(USER_NOT_FOUNT_ERROR);
    return user;
  }
}
