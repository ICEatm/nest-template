import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { LoggerService } from '@common/services/logger.service';
import { Request, Response } from 'express';

/**
 * LoggerMiddleware is a NestJS middleware responsible for logging incoming HTTP requests and their responses.
 *
 * This middleware captures important details about each request, such as the method, URL, IP address, user agent,
 * and response time. It logs this information using the NestJS Logger and a custom LoggerService which writes
 * the logs to a file.
 *
 * The middleware intercepts the request, logs it when the response is finished, and then passes control to the next
 * middleware or handler in the chain.
 *
 * @module LoggerMiddleware
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  constructor(private readonly loggerService: LoggerService) {}

  /**
   * Middleware function that logs the details of the request and response.
   *
   * @param req - The incoming HTTP request object.
   * @param res - The outgoing HTTP response object.
   * @param next - A callback function to pass control to the next middleware or handler.
   */
  use(req: Request, res: Response, next: () => void): void {
    const { method, baseUrl, url, ip, headers } = req;
    const userAgent = headers['user-agent'] || 'Unknown User Agent';
    const start = process.hrtime();

    res.on('finish', async () => {
      const statusCode = res.statusCode;
      const durationInMilliseconds = this.getDurationInMilliseconds(start);

      const logMessage = this.constructLogMessage(
        ip || 'n/a',
        method,
        statusCode,
        baseUrl,
        url,
        userAgent,
        durationInMilliseconds,
      );

      this.logger.log(logMessage);

      try {
        await this.loggerService.writeLogToFile(logMessage);
      } catch (error) {
        this.logger.error(`Error logging request: ${error.message}`);
      }
    });

    next();
  }

  /**
   * Constructs a log message string from the request and response details.
   *
   * @param ip - The IP address of the client making the request.
   * @param method - The HTTP method of the request (e.g., GET, POST).
   * @param statusCode - The HTTP status code of the response.
   * @param baseUrl - The base URL of the request.
   * @param url - The full URL of the request.
   * @param userAgent - The user agent string from the request headers.
   * @param durationInMilliseconds - The duration of the request in milliseconds.
   * @returns A formatted log message string.
   */
  private constructLogMessage(
    ip: string,
    method: string,
    statusCode: number,
    baseUrl: string,
    url: string,
    userAgent: string,
    durationInMilliseconds: number,
  ): string {
    return `${method} ${statusCode} - ${baseUrl}${url} - ${userAgent} - ${ip} - ${durationInMilliseconds}ms`;
  }

  /**
   * Calculates the duration of the request in milliseconds.
   *
   * @param start - The high-resolution time at the start of the request.
   * @returns The duration of the request in milliseconds.
   */
  private getDurationInMilliseconds(start: [number, number]): number {
    const [seconds, nanoseconds] = process.hrtime(start);
    return Math.floor(seconds * 1000 + nanoseconds / 1000000);
  }
}
