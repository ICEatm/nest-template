import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
/**
 * ParseIntPipe is a custom pipe that transforms a string into an integer.
 * If the transformation fails (i.e., the value cannot be parsed as an integer),
 * it throws a BadRequestException.
 */
export class ParseIntPipe implements PipeTransform<string> {
  /**
   * Transforms the input string into an integer.
   *
   * @param value - The string value to be transformed.
   * @returns The transformed integer value.
   * @throws BadRequestException if the value cannot be parsed as an integer.
   */
  async transform(value: string): Promise<number> {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Transform validation failed');
    }
    return val;
  }
}
