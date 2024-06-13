import {
  BadRequestException,
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
/**
 * ValidationPipe is a custom pipe that validates incoming request payloads
 * using class-transformer and class-validator.
 *
 * This pipe automatically transforms plain JavaScript objects into instances
 * of the specified class and validates them. If validation fails, it throws
 * a BadRequestException.
 */
export class ValidationPipe implements PipeTransform<any> {
  /**
   * Transforms and validates the incoming value based on the provided metadata.
   *
   * @param value - The value to be transformed and validated.
   * @param metadata - The metadata containing information about the type to transform to.
   * @returns The transformed and validated value.
   * @throws BadRequestException if validation fails.
   */
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Payload validation failed');
    }
    return value;
  }

  /**
   * Checks if the given metatype needs to be validated.
   *
   * @param metatype - The metatype to check.
   * @returns true if the metatype is not a primitive type and needs to be validated; otherwise, false.
   */
  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
