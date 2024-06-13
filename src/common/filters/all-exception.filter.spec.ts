import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AllExceptionFilter } from './all-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

describe('AllExceptionFilter', () => {
  let filter: AllExceptionFilter;
  let httpAdapterHost: HttpAdapterHost;

  beforeEach(() => {
    httpAdapterHost = {
      httpAdapter: {
        reply: jest.fn(),
      },
    } as unknown as HttpAdapterHost;

    filter = new AllExceptionFilter(httpAdapterHost);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should handle HttpException', () => {
    const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const host = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ url: '/test' })),
        getResponse: jest.fn(() => ({})),
      })),
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);

    expect(httpAdapterHost.httpAdapter.reply).toHaveBeenCalledWith(
      expect.any(Object), // response object
      {
        success: false,
        data: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Forbidden',
          path: '/test',
          timestamp: expect.any(String), // timestamp
        },
      },
      HttpStatus.FORBIDDEN,
    );
  });

  it('should handle non-HttpException', () => {
    const exception = new Error('Some error');
    const host = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ url: '/test' })),
        getResponse: jest.fn(() => ({})),
      })),
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);

    expect(httpAdapterHost.httpAdapter.reply).toHaveBeenCalledWith(
      expect.any(Object), // response object
      {
        success: false,
        data: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
          path: '/test',
          timestamp: expect.any(String), // timestamp
        },
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
});
