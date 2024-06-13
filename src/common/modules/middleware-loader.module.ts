import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { LoggerService } from '@common/services/logger.service';
import helmet from 'helmet';

/**
 * The `MiddlewareLoaderModule` is responsible for loading and configuring middleware
 * for the NestJS application.
 *
 * Middleware are functions executed before the request reaches the route handler.
 * They can be used for tasks such as logging, error handling, authentication, etc.
 *
 * This module implements the `NestModule` interface to provide configuration for
 * middleware loading.
 */
@Module({
  providers: [LoggerService],
})
export class MiddlewareLoaderModule implements NestModule {
  /**
   * Configures middleware for the NestJS application.
   *
   * @param consumer - Middleware consumer used to apply middleware to routes.
   * The `MiddlewareConsumer` interface provides methods for applying middleware
   * to specific routes.
   *
   * For this module, the `configure` method applies Helmet middleware for
   * enhancing security by setting various HTTP headers. Additionally, it applies
   * the custom `LoggerMiddleware` for logging request information.
   *
   * @see {@link https://docs.nestjs.com/middleware}
   */
  configure(consumer: MiddlewareConsumer) {
    // Apply Helmet middleware for setting HTTP headers
    consumer.apply(helmet()).forRoutes('*');

    // Apply custom LoggerMiddleware for logging request information
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
