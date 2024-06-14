import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private readonly httpService: NestHttpService) {}

  /**
   * Performs a GET request to the specified URL.
   * @param url - The URL to send the GET request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to an AxiosResponse.
   * @throws {HttpException} Throws an HttpException if the request fails.
   */
  async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.get(url, config));
  }

  /**
   * Performs a POST request to the specified URL with the given data.
   * @param url - The URL to send the POST request to.
   * @param data - The data to send in the POST request.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to an AxiosResponse.
   * @throws {HttpException} Throws an HttpException if the request fails.
   */
  async post(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.post(url, data, config));
  }

  /**
   * Performs a PUT request to the specified URL with the given data.
   * @param url - The URL to send the PUT request to.
   * @param data - The data to send in the PUT request.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to an AxiosResponse.
   * @throws {HttpException} Throws an HttpException if the request fails.
   */
  async put(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.put(url, data, config));
  }

  /**
   * Performs a DELETE request to the specified URL.
   * @param url - The URL to send the DELETE request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise that resolves to an AxiosResponse.
   * @throws {HttpException} Throws an HttpException if the request fails.
   */
  async delete(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.delete(url, config));
  }

  /**
   * Handles the HTTP request and catches errors to throw appropriate HttpExceptions.
   * @param request - The HTTP request observable.
   * @returns A promise that resolves to an AxiosResponse.
   * @throws {HttpException} Throws an HttpException with the appropriate status and message.
   */
  private async handleRequest(request: any): Promise<AxiosResponse> {
    return await lastValueFrom(
      request.pipe(
        catchError((error) => {
          if (error.response) {
            throw new HttpException(
              {
                status: error.response.status,
                message: error.response.data,
              },
              error.response.status,
            );
          } else if (error.request) {
            throw new HttpException(
              {
                status: HttpStatus.SERVICE_UNAVAILABLE,
                message: 'No response received from server',
              },
              HttpStatus.SERVICE_UNAVAILABLE,
            );
          } else {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        }),
      ),
    );
  }
}
