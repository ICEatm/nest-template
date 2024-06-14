import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private readonly httpService: NestHttpService) {}

  async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.get(url, config));
  }

  async post(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.post(url, data, config));
  }

  async put(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.put(url, data, config));
  }

  async delete(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.handleRequest(this.httpService.delete(url, config));
  }

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
