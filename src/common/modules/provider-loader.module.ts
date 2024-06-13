import { TransformInterceptor } from '@core/interceptors/transform.interceptor';
import { AllExceptionFilter } from '@common/filters/all-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { Module } from '@nestjs/common';

/**
 * ProviderLoaderModule is a NestJS module that provides global application-wide interceptors, filters, and pipes.
 *
 * This module is responsible for registering the following providers:
 * - `TransformInterceptor`: An interceptor that transforms the outgoing responses.
 * - `AllExceptionFilter`: A filter that handles all exceptions thrown by the application.
 * - `ValidationPipe`: A pipe that validates incoming request data against specified DTOs.
 *
 * The module uses the `APP_INTERCEPTOR`, `APP_FILTER`, and `APP_PIPE` tokens provided by the `@nestjs/core` package to register these
 * providers globally, meaning they will apply to all controllers and routes within the application.
 *
 * @module ProviderLoaderModule
 */
@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class ProviderLoaderModule {}
