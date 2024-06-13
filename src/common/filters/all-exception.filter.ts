import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
/**
 * AllExceptionFilter is a global exception filter for handling all exceptions
 * that occur during the processing of a request in a NestJS application.
 *
 * This filter catches both HTTP exceptions and non-HTTP exceptions,
 * formats the error response, and sends it to the client.
 */
export class AllExceptionFilter implements ExceptionFilter<HttpException> {
  /**
   * @param httpAdapterHost - The HTTP adapter host, which provides access to the HTTP adapter used by the application.
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * Method to catch and handle exceptions thrown during the request processing.
   *
   * @param exception - The exception that was thrown.
   * @param host - The execution context, which provides methods to access the request and response objects.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();
    const request = context.getRequest();
    const errorMessage =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * The formatted error response object.
     *
     * @property {boolean} success - Indicates whether the request was successful. Always false for errors.
     * @property {Object} data - The details of the error response.
     * @property {number} data.statusCode - The HTTP status code of the error.
     * @property {string} data.message - The error message.
     * @property {string} data.path - The URL path where the error occurred.
     * @property {string} data.timestamp - The timestamp when the error occurred.
     */
    const errorResponseBody = {
      success: false,
      data: {
        statusCode: httpStatus,
        message: errorMessage,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };

    httpAdapter.reply(context.getResponse(), errorResponseBody, httpStatus);
  }
}
