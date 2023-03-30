import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { INVALID_ID_ERROR } from './id.validation.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' && metadata.type !== 'query') return value;

    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException(INVALID_ID_ERROR);

    return value;
  }
}
