import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { LoggerService } from '../services/logger.service';
import helmet from 'helmet';

/**
 * The MiddlewareLoaderModule is responsible for configuring middlewares
 * used in the application.
 */
@Module({
  providers: [LoggerService],
})
export class MiddlewareLoaderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
