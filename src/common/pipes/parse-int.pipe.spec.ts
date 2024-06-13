import { ParseIntPipe } from './parse-int.pipe';
import { BadRequestException } from '@nestjs/common';

describe('ParseIntPipe', () => {
  let pipe: ParseIntPipe;

  beforeEach(() => {
    pipe = new ParseIntPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform string to integer', async () => {
    const value = '123';
    const result = await pipe.transform(value);
    expect(result).toBe(123);
  });

  it('should throw an error if value cannot be parsed to integer', async () => {
    const value = 'abc';
    await expect(pipe.transform(value)).rejects.toThrow(BadRequestException);
  });

  it('should transform float string to integer', async () => {
    const value = '123.45';
    const result = await pipe.transform(value);
    expect(result).toBe(123); // parseInt will convert '123.45' to 123
  });

  it('should handle negative integers', async () => {
    const value = '-123';
    const result = await pipe.transform(value);
    expect(result).toBe(-123);
  });

  it('should throw an error for empty string', async () => {
    const value = '';
    await expect(pipe.transform(value)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error for whitespace string', async () => {
    const value = '   ';
    await expect(pipe.transform(value)).rejects.toThrow(BadRequestException);
  });

  it('should transform string with leading and trailing spaces to integer', async () => {
    const value = '  123  ';
    const result = await pipe.transform(value);
    expect(result).toBe(123);
  });
});
