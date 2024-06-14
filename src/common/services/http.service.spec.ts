import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from './http.service';
import { HttpService as NestHttpService, HttpModule } from '@nestjs/axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';

describe('HttpService', () => {
  let service: HttpService;
  let httpService: NestHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HttpService],
    }).compile();

    service = module.get<HttpService>(HttpService);
    httpService = module.get<NestHttpService>(NestHttpService);
  });

  describe('get', () => {
    it('should return data on successful GET request', async () => {
      const result: AxiosResponse = {
        data: { message: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));

      expect(await service.get('https://example.com')).toEqual(result);
    });

    it('should throw an HttpException on GET request failure', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() =>
        throwError({
          response: {
            status: 404,
            data: 'Not Found',
          },
        }),
      );

      await expect(service.get('https://example.com')).rejects.toThrow(
        new HttpException(
          {
            status: 404,
            message: 'Not Found',
          },
          404,
        ),
      );
    });
  });

  describe('post', () => {
    it('should return data on successful POST request', async () => {
      const result: AxiosResponse = {
        data: { message: 'success' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
      jest.spyOn(httpService, 'post').mockImplementation(() => of(result));

      expect(await service.post('https://example.com', {})).toEqual(result);
    });

    it('should throw an HttpException on POST request failure', async () => {
      jest.spyOn(httpService, 'post').mockImplementation(() =>
        throwError({
          response: {
            status: 400,
            data: 'Bad Request',
          },
        }),
      );

      await expect(service.post('https://example.com', {})).rejects.toThrow(
        new HttpException(
          {
            status: 400,
            message: 'Bad Request',
          },
          400,
        ),
      );
    });
  });

  describe('put', () => {
    it('should return data on successful PUT request', async () => {
      const result: AxiosResponse = {
        data: { message: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
      jest.spyOn(httpService, 'put').mockImplementation(() => of(result));

      expect(await service.put('https://example.com', {})).toEqual(result);
    });

    it('should throw an HttpException on PUT request failure', async () => {
      jest.spyOn(httpService, 'put').mockImplementation(() =>
        throwError({
          response: {
            status: 401,
            data: 'Unauthorized',
          },
        }),
      );

      await expect(service.put('https://example.com', {})).rejects.toThrow(
        new HttpException(
          {
            status: 401,
            message: 'Unauthorized',
          },
          401,
        ),
      );
    });
  });

  describe('delete', () => {
    it('should return data on successful DELETE request', async () => {
      const result: AxiosResponse = {
        data: { message: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
      jest.spyOn(httpService, 'delete').mockImplementation(() => of(result));

      expect(await service.delete('https://example.com')).toEqual(result);
    });

    it('should throw an HttpException on DELETE request failure', async () => {
      jest.spyOn(httpService, 'delete').mockImplementation(() =>
        throwError({
          response: {
            status: 403,
            data: 'Forbidden',
          },
        }),
      );

      await expect(service.delete('https://example.com')).rejects.toThrow(
        new HttpException(
          {
            status: 403,
            message: 'Forbidden',
          },
          403,
        ),
      );
    });
  });
});
