import { LoggerService } from '@common/services/logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { Request, Response } from 'express';

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = {
      writeLogToFile: jest.fn().mockResolvedValue(undefined),
    } as any;
    loggerMiddleware = new LoggerMiddleware(loggerService);
  });

  it('should be defined', () => {
    expect(loggerMiddleware).toBeDefined();
  });

  it('should log request details', async () => {
    const req = {
      method: 'GET',
      baseUrl: '/api',
      url: '/test',
      ip: '127.0.0.1',
      headers: { 'user-agent': 'jest' },
    } as Request;

    const res = {
      statusCode: 200,
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    } as unknown as Response;

    const next = jest.fn();

    const logSpy = jest.spyOn(loggerMiddleware['logger'], 'log');
    const errorSpy = jest.spyOn(loggerMiddleware['logger'], 'error');
    const writeLogSpy = jest.spyOn(loggerService, 'writeLogToFile');

    loggerMiddleware.use(req, res, next);

    expect(next).toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operations

    expect(logSpy).toHaveBeenCalledWith(
      'GET 200 - /api/test - jest - 127.0.0.1 - 0ms',
    );
    expect(writeLogSpy).toHaveBeenCalledWith(
      'GET 200 - /api/test - jest - 127.0.0.1 - 0ms',
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should handle logging error', async () => {
    const req = {
      method: 'GET',
      baseUrl: '/api',
      url: '/test',
      ip: '127.0.0.1',
      headers: { 'user-agent': 'jest' },
    } as Request;

    const res = {
      statusCode: 200,
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    } as unknown as Response;

    const next = jest.fn();

    jest
      .spyOn(loggerService, 'writeLogToFile')
      .mockRejectedValue(new Error('Test error'));
    const errorSpy = jest.spyOn(loggerMiddleware['logger'], 'error');

    loggerMiddleware.use(req, res, next);

    expect(next).toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operations

    expect(errorSpy).toHaveBeenCalledWith('Error logging request: Test error');
  });
});
