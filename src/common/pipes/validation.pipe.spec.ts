import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { IsString, IsInt, Min } from 'class-validator';
import { ValidationPipe } from './validation.pipe';

class TestDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  age: number;
}

describe('ValidationPipe', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = new ValidationPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate and transform the input', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
    };

    const value = { name: 'John', age: 30 };
    const result = await pipe.transform(value, metadata);

    expect(result).toEqual(value);
  });

  it('should throw an error if validation fails', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
    };

    const value = { name: 123, age: -1 };

    await expect(pipe.transform(value, metadata)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should skip validation if no metatype is provided', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: undefined,
    };

    const value = { name: 'John', age: 30 };
    const result = await pipe.transform(value, metadata);

    expect(result).toEqual(value);
  });

  it('should skip validation for primitive types', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: String,
    };

    const value = 'test string';
    const result = await pipe.transform(value, metadata);

    expect(result).toEqual(value);
  });
});
